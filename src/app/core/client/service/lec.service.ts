import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LecService {
    private readonly _URI: string = '/lecturas/';
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _http: ClientService = inject(ClientService);
    private readonly _lecSignal: WritableSignal<any[]> = signal<any[]>([]);
    private readonly _lecSignalMes: WritableSignal<any[]> = signal<any[]>([]);

    public fetchByMes(from?: string, to?: string): Observable<any[]> {

        // Construir query params solo si existen from y to
        let params = '';
        if (from) params += `FechaRegistro=>&FechaRegistro=${from}`;
        if (to) params += (params ? '&' : '') + `FechaRegistro=<=&FechaRegistro=${to}`;

        const url = params ? `${this._URI}?${params}` : this._URI;

        return this._http.get<{ status: number; message: string; data: any[] }>(url).pipe(
            map(response => response.data),
            tap(lec => {
                this._lecSignalMes.set(lec);
                this._alert.clean();
            }),
            catchError(error => {
                this._alert.setAlert(400, "Error al obtener los medidores");
                return of([]);
            })
        );
    }



    public fetchByPeriodo(): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();
        const url = `${this._URI}?FechaRegistro=>&FechaRegistro=2025-07-1&FechaRegistro=<&FechaRegistro=2025-07-05`
        return this._http.get<{ status: number; message: string; data: any[] }>(url).pipe(
            map(response => response.data),
            tap(lec => {
                clearTimeout(loaderTimeout);
                this._lecSignal.set(lec);
                this._alert.clean();
            }),
            catchError(error => {
                clearTimeout(loaderTimeout);
                this._alert.setAlert(400, "Error al obtener los medidores");
                return of([]);
            })
        );
    }


    public get(): any[] {
        return this._lecSignal();
    }

    public getMes(): any[] {
        return this._lecSignalMes();
    }
}