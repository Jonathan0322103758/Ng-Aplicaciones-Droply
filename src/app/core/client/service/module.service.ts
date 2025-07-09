import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { Module } from "@Interface/module.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ModuleService {
    private readonly _URI: string = '/module';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _moduleService: WritableSignal<Module[]> = signal<Module[]>([]);
    private readonly _dummyService: WritableSignal<{ rol: string, modulos: Module[] }[]> = signal<{ rol: string, modulos: Module[] }[]>([]);

    public fetch(userId?: string): Observable<Module[]> {
        const params = userId ? { params: { userId } } : {};

        return this._http.get<{ status: number; message: string; data: Module[] }>(this._URI, params).pipe(
            map(response => response.data),
            tap(modules => {
                this._moduleService.set(modules);
            }),
            catchError(error => {
                console.error('Error fetching modules:', error);
                return of([]);
            })
        );
    }


    public get(): Module[] {
        return this._moduleService()
    }

    public dummydata(): { rol: string, modulos: Module[] }[] {
        const data = [
            {
                rol: 'Administrador',
                modulos: [
                    { _id: '0', module: "Usuarios", icon: "user", status: true },
                    { _id: '0', module: "Notificaciones", icon: "bell", status: true },
                    { _id: '0', module: "Medidores", icon: "stopwatch", status: true },
                    { _id: '0', module: "Lineas de Agua", icon: "droplet", status: true },
                    { _id: '0', module: "Costos y Tarifas", icon: "chart-column", status: true },
                    { _id: '0', module: "Actividades", icon: "screwdriver-wrench", status: true },
                    { _id: '0', module: "Reportes", icon: "folder", status: true },
                ]
            },
            {
                rol: 'Gerente',
                modulos: [
                    { _id: '0', module: "Notificaciones", icon: "bell", status: true },
                    { _id: '0', module: "Medidores", icon: "stopwatch", status: true },
                    { _id: '0', module: "Lineas de Agua", icon: "droplet", status: true },
                    { _id: '0', module: "Costos y Tarifas", icon: "chart-column", status: true },
                    { _id: '0', module: "Actividades", icon: "screwdriver-wrench", status: true },
                    { _id: '0', module: "Reportes", icon: "folder", status: true },
                    { _id: '0', module: "Usuarios", icon: "user", status: false },
                ]
            },
            {
                rol: 'Auditor',
                modulos: [
                    { _id: '0', module: "Notificaciones", icon: "bell", status: true },
                    { _id: '0', module: "Medidores", icon: "stopwatch", status: true },
                    { _id: '0', module: "Lineas de Agua", icon: "droplet", status: true },
                    { _id: '0', module: "Costos y Tarifas", icon: "chart-column", status: true },
                    { _id: '0', module: "Actividades", icon: "screwdriver-wrench", status: false },
                    { _id: '0', module: "Reportes", icon: "folder", status: false },
                    { _id: '0', module: "Usuarios", icon: "user", status: false },

                ]
            },
        ]
        this._dummyService.set(data)
        return this._dummyService()
    }

}