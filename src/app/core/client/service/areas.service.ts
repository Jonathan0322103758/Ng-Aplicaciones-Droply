import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { Module } from "@Interface/module.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AreasService {
    private readonly _URI: string = '/roles';
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _http: ClientService = inject(ClientService);
    private readonly _areasSignal: WritableSignal<any[]> = signal<any[]>([]);

    public fetch(): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();
        return this._http.get<{ status: number; message: string; data: any[] }>(`${this._URI}/areasIndustriales`).pipe(
            map(response => response.data),
            tap(areas => {
                clearTimeout(loaderTimeout);
                this._areasSignal.set(areas);
                this._alert.clean();
            }),
            catchError(error => {
                clearTimeout(loaderTimeout);
                this._alert.setAlert(400, "Error al obtener las áreas");
                return of([]);
            })
        );
    }


    public get(): any[] {
        return this._areasSignal();
    }

}