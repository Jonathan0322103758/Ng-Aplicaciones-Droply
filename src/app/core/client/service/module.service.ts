import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { Module } from "@Interface/module.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ModuleService {
    private readonly _url: string = 'http://localhost:9000/module';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _moduleService: WritableSignal<Module[]> = signal<Module[]>([]);

    public fetch(): Observable<Module[]> {
        return this._http.get<{ status: number; message: string; data: Module[] }>(this._url).pipe(
            map(response => response.data),
            tap(users => {
                console.log('Response:', users);
                this._moduleService.set(users);
            }),
            catchError(error => {
                console.error('Error fetching users:', error);
                return of([]);
            })
        );
    }

    public get(): Module[] {
        return this._moduleService()
    }
}