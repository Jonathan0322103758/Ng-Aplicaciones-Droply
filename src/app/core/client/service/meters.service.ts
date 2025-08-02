import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MetersService {
    private readonly _URI: string = '/medidores/';
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _http: ClientService = inject(ClientService);
    private readonly _metersSignal: WritableSignal<any[]> = signal<any[]>([]);

    public fetch(): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();
        return this._http.get<{ status: number; message: string; data: any[] }>(`${this._URI}`).pipe(
            map(response => response.data),
            tap(meters => {
                clearTimeout(loaderTimeout);
                this._metersSignal.set(meters);
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
        return this._metersSignal();
    }
}