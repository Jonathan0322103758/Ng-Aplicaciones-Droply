import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DatabaseService {
    private readonly _URI: string = '/database';
    private readonly _http: ClientService = inject(ClientService);

    public fetch(): Observable<any[]> {
        
        return this._http.get<{ status: number; message: string; data: any[] }>(`${this._URI}`).pipe(
            map(response => response.data),
            tap(roles => {
                console.log(roles)  
            }),
            catchError(error => {
                console.error('Error fetching modules:', error);
                return of([]);
            })
        );
    }   
}