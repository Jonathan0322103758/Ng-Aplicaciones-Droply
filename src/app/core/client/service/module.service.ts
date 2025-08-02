import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { Module } from "@Interface/module.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ModuleService {
    private readonly _URI: string = '/modulos';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _moduleRolSignal: WritableSignal<Module[]> = signal<Module[]>([]);
    private readonly _moduleSignal: WritableSignal<Module[]> = signal<Module[]>([]);

    public fetch(): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();
        return this._http.get<{ status: number; message: string; data: any[] }>(`${this._URI}/`).pipe(
            map(response => response.data),
            tap(modules => {
                clearTimeout(loaderTimeout);
                this._moduleSignal.set(modules);
                this._alert.clean()
            }),
            catchError(error => {
                this._alert.setAlert(400, "Error al obtener los modulos habilitados en el sistema")
                return of([]);
            })
        );
    }

    public fetchModulesByRole(): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();
        return this._http.get<{ status: number; message: string; data: any[] }>(`${this._URI}Rol/`).pipe(
            map(response => response.data),
            tap(modules => {
                clearTimeout(loaderTimeout);
                this._moduleRolSignal.set(modules);
                this._alert.clean()
            }),
            catchError(error => {
                this._alert.setAlert(400, "Error al obtener los modulos habilitados en el sistema")
                return of([]);
            })
        );
    }


    public getModulesByRole(): any[] {
        return this._moduleRolSignal()
    }

    public get(): any[] {
        return this._moduleSignal()
    }
}