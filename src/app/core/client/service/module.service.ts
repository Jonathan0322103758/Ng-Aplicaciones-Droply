import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { Module } from "@Interface/module.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ModuleService {
    private readonly _URI: string = '/module';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _moduleService: WritableSignal<Module[]> = signal<Module[]>([]);

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

}