import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ActivityService {
    private readonly _URI: string = '/actividades/';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _activitySignal: WritableSignal<any[]> = signal<any[]>([]);
    private readonly _progressSignal: WritableSignal<any[]> = signal<any[]>([]);

    private _token = typeof window !== 'undefined' && window.localStorage
        ? localStorage.getItem('token')
        : null;
    private payload = this.decodePayload(this._token!)

    public fetch(): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();
        const estadosFijos = ['Archivado', 'En Progreso', 'En Pausa', 'Finalizado',];

        return this._http.get<{ status: number; message: string; data: any[] }>(`/mis/actividades/`).pipe(
            map(response => {
                const original = response.data;

                const columnas = estadosFijos.map((estado, index) => {
                    const match = original.find(c => c.Estado === estado);
                    return {
                        _id: index + 1,
                        Estado: estado,
                        Actividades: match?.Actividades || []
                    };
                });

                return columnas;
            }),
            tap(activity => {
                clearTimeout(loaderTimeout);
                this._activitySignal.set(activity);
                this._alert.clean();
            }),
            catchError(error => {
                this._alert.setAlert(400, "Error al obtener las tareas");
                return of([]);
            })
        );
    }


    public fetchProgres(body?: { [key: string]: [string, string] }): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();

        return this._http.get<{ status: number; message: string; data: any[] }>(
            `${this._URI}estado`,
            body
        ).pipe(
            map(response => response.data),
            tap(progress => {
                clearTimeout(loaderTimeout);
                this._progressSignal.set(progress);
                this._alert.clean();
            }),
            catchError((error) => {
                clearTimeout(loaderTimeout);
                this._alert.setAlert(400, "Error al obtener las tareas");
                return of([]);
            })
        );
    }

    public get(): any[] {
        return this._activitySignal()
    }

    public post(data: any): void {
        this._alert.loader();
        this._http.post<any>(this._URI, data).subscribe({
            next: (response) => {
                this._http.post<any>('/actividadesUsuario', { Actividad: response.data.Id, Usuario: this.payload.id }).subscribe({
                    next: (response) => {
                        this._alert.setAlert(200, "Tarea registrada exitosamente!");
                    }
                })
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al registrar la Tarea")
            }
        })
    }

    public put(data: any): void {
        console.log(data)
        this._http.put<any>(`${this._URI}${data.Id}`, data).subscribe({
            next: (response) => {
                console.log(response)
            },
            error: (error) => {
                console.error(error)
            }
        })
    }

    public getProgress(): any[] {
        return this._progressSignal()
    }

    public setActivity(newData: any[]) {
        this._activitySignal.set(newData);
    }

    decodePayload(token: string): any {
        const [, payloadBase64] = token.split('.');
        return JSON.parse(atob(payloadBase64));
    }
}
