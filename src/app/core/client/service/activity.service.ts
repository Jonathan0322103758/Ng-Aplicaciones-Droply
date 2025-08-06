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
        const estadosFijos = ['Archivado', 'En Pausa', 'En Progreso', 'Finalizado'];

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

    public fetchGeneral(): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();
        return this._http.get<{ status: number; message: string; data: any[] }>(`${this._URI}`).pipe(
            map(response => {
                const estadoOrden = ['Archivado', 'En Pausa', 'En Progreso', 'Finalizado'];
                return response.data.sort((a, b) =>
                    estadoOrden.indexOf(a.Estado) - estadoOrden.indexOf(b.Estado)
                );
            }),
            tap(activity => {
                clearTimeout(loaderTimeout);
                this._activitySignal.set(activity);
                this._alert.clean();
            }),
            catchError(error => {
                clearTimeout(loaderTimeout);
                this._alert.setAlert(400, "Error al obtener las áreas");
                return of([]);
            })
        );
    }


    public fetchProgres(params?: { FechaInicio: [string, string]; FechaFin: [string, string] }): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();
        // Construir la query string como arrays JSON sin codificar y sin espacios
        let query = '';
        if (params) {
            query = `FechaInicio=["${params.FechaInicio[0]}","${params.FechaInicio[1]}"]&FechaFin=["${params.FechaFin[0]}","${params.FechaFin[1]}"]`;
        }
        const url = query ? `${this._URI}estado?${query}` : `${this._URI}estado`;
        return this._http.get<{ status: number; message: string; data: any[] }>(
            url
        ).pipe(
            map(response => response.data),
            tap(progress => {
                const filtrarProgress = progress.filter(p => p.Estado !== "");
                clearTimeout(loaderTimeout);
                this._progressSignal.set(filtrarProgress);
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
                this._http.post<any>('/actividadesUsuario/', { Actividad: response.data.Id, Usuario: this.payload.id }).subscribe({
                    next: (response) => {
                        this._alert.setAlert(200, "Tarea registrada exitosamente!");
                    },
                    error: (error) => {
                        this._alert.setAlert(400, "Error al registrar la Tarea");
                    }
                });
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al registrar la Tarea");
            }
        })
    }

    public put(data: any): void {
        this._http.put<any>(`${this._URI}${data.Actividad.Id}`, data).subscribe({
            next: (response) => {
                console.log(response)
            },
            error: (error) => {
                console.error(error)
            }
        })
    }

    public putAlert(data: any): void {
        this._alert.loader()
        this._http.put<any>(`${this._URI}${data.Id}`, data).subscribe({
            next: (response) => {
                this._alert.setAlert(200, "Tarea actualizada exitosamente!");
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al actualizar la Tarea");
            }
        })
    }

    public delete(data: any): void {
        this._alert.loader()
        this._http.delete<any>(`/actividadesUsuario/${data.Id}`).subscribe({
            next: (response) => {
                this._alert.setAlert(200, "Tarea eliminada exitosamente!");
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al eliminar la Tarea");
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
