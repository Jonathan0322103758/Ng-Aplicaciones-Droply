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

    public backupFull(credentials: { username: string, password: string }): void {
        this._alert.loader();
        this._http.post<{ backup_file: string }>(`${this._URI}/backup/full`, credentials).subscribe({
            next: (response: { backup_file: string }) => {
                this._alert.setAlert(200, `Respaldo completo creado con éxito, nombre del respaldo: ${response.backup_file}`);
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al crear el respaldo completo, credenciales incorrectas");
            }
        });
    }

    public backupByTables(credentials: { username: string, password: string }, tables: string[]) {
        this._alert.loader()
        return this._http.post<any>(`${this._URI}/backup/partial`, { credentials: credentials, tables: tables }).subscribe({
            next: (response: any) => {
                this._alert.setAlert(200, `Respaldo creado con éxito, nombre del respaldo: ${response.backup_file}`)
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al crear el respaldo, credenciales incorrectas");

            }
        });
    }

    public formatDatabase(credentials: { username: string, password: string }): void {
        this._alert.setAlert(300, "ADVERTENCIA!!! ¿Seguro de formatear la base de datos?, se eliminarán todos los datos registrados. Recomendación: Realizar un respaldo antes de continuar.");
        this._alert.confirmCallback = () => {
            this._http.post(`${this._URI}/format`, credentials).subscribe({
                next: (response: any) => {
                    this._alert.setAlert(200, "Base de datos formateada con éxito");
                },
                error: (error) => {
                    this._alert.setAlert(400, "Error al formatear la base de datos, credenciales incorrectas");
                }
            });
        }
    }

    public exportCSV(credentials: { username: string, password: string }, table: string): void {
        this._alert.loader();
        this._http.post(`${this._URI}/export/csv`, { credentials, table }, { responseType: 'blob', observe: 'response' }).subscribe({
            next: (response: any) => {
                const contentDisposition = response.headers?.get('Content-Disposition');
                const timestamp = Date.now();
                let filename = `archivo_${table}_${timestamp}.csv`;
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (match) filename = match[1];
                }
                const blob = new Blob([response.body], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                this._alert.setAlert(200, `Archivo CSV exportado con éxito`);
            },
            error: () => {
                this._alert.setAlert(400, "Error al exportar el archivo CSV, credenciales incorrectas");
            }
        });
    }
}