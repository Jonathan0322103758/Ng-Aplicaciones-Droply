import { inject, Injectable, signal, } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { error } from "console";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DatabaseService {
    private readonly _URI: string = '/db/admin';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _tablesSignal = signal<string[]>([]);
    private readonly _backupsSignal = signal<string[]>([]);
    private readonly _CREDENTIALS = {
        "username": "postgres",
        "password": "DarthMonkus117"
    }


    public fetchTables(): Observable<{ tables: string[] }> {
        return this._http.post<{ tables: string[] }>(`${this._URI}/tables`, this._CREDENTIALS).pipe(
            tap((response: { tables: string[] }) => {
                this._tablesSignal.set(response.tables)
            }),
            catchError(error => {
                console.error('Error fetching modules:', error);
                return of({ tables: [] });
            })
        );
    }

    public getTables(): string[] {
        return this._tablesSignal();
    }

    public backupByTables(credentials: { username: string, password: string }, tables: string[]) {
        this._alert.loader()
        return this._http.post<any>(`${this._URI}/backup/partial`,{ credentials: credentials, tables: tables}).subscribe({
            next: (response: any) => {
                this._alert.setAlert(200, `Respaldo creado con éxito, nombre del respaldo: ${response.backup_file}`)
            },
            error: (error) => {
                this._alert.setAlert(400, "Error en el inicio de sesión");
            }
        });
    }

    public fetchBackups(): Observable<{ backups: string[] }> {
        return this._http.post<{ backups: string[] }>(`${this._URI}/backup/list`, null).pipe(
            tap((response: { backups: string[] }) => {
                this._backupsSignal.set(response.backups)
            }),
            catchError(error => {
                console.error('Error fetching modules:', error);
                return of({ backups: [] });
            })
        );
    }

    public getBackups(): string[] {
        return this._backupsSignal();
    }
}