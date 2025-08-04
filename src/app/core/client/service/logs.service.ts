import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LogsService {
    private readonly _URI: string = '/bitacoras/';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _logsSignal: WritableSignal<any[]> = signal<any[]>([]);

    public fetch(): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();
        return this._http.get<{ status: number; message: string; data: any[] }>(`${this._URI}`).pipe(
            map(response => response.data),
            tap(log => {
                clearTimeout(loaderTimeout);
                this._logsSignal.set(log);
                this._alert.clean();
            }),
            catchError(error => {
                this._alert.setAlert(400, "Error al obtener las bitacoras")
                return of([]);
            })
        );
    }

    public get(): any[] {
        return this._logsSignal()
    }

    public post(data: any): void {
        this._alert.loader();
        this._http.post<any>(this._URI, data).subscribe({
            next: (response) => {
                this._alert.setAlert(200, "Bitácora registrada exitosamente!");
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al registrar la bitácora")
            }
        })
    }

    public delete(data: any): void {
        this._alert.loader();
        this._http.delete<any>(`${this._URI}${data.Id}`).subscribe({
            next: (response) => {
                this._alert.setAlert(200, "Bitácora eliminada exitosamente!");
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al eliminar la bitácora")
            }
        })
    }
}