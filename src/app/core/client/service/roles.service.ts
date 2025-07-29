import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { Module } from "@Interface/module.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RolesService {
    private readonly _URI: string = '/roles';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _roleUserService: WritableSignal<any[]> = signal<any[]>([]);

    public fetch(): Observable<any[]> {

        return this._http.get<{ status: number; message: string; data: any[] }>(this._URI).pipe(
            map(response => response.data),
            tap(roles => {
                this._roleUserService.set(roles); 
                console.log(roles)  
            }),
            catchError(error => {
                console.error('Error fetching modules:', error);
                return of([]);
            })
        );
    }


    public getRoleUsers(): Module[] {
        return this._roleUserService()
    }

}