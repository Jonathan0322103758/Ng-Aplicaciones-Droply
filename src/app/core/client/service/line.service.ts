import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LinesService {
    private readonly _URI: string = '/lineasAgua/';
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _http: ClientService = inject(ClientService);
    private readonly _lineSignal: WritableSignal<any[]> = signal<any[]>([]);

    public fetch(): Observable<any[]> {
        return this._http.get<{ status: number; message: string; data: any[] }>(`${this._URI}`).pipe(
            map(response => response.data),
            tap(lines => {
                this._lineSignal.set(lines);
                this._alert.clean();
            }),
            catchError(error => {
                this._alert.setAlert(400, "Error al obtener las líneas");
                return of([]);
            })
        );
    }


    public get(): any[] {
        return this._lineSignal();
    }

    public post(data: any): void {
        this._alert.loader();
        this._http.post<any>(this._URI, data).subscribe({
            next: (response) => {
                this._alert.setAlert(200, `Línea registrada exitosamente!, nueva línea: ${response.data.Codigo}`);
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al registrar la línea")
            }
        })

    }

    public put(data: any): void {
        this._alert.setAlert(100, "¿Seguro de actualizar el registro de línea?");
        this._alert.confirmCallback = () => {
            this._http.put(`${this._URI}${data.Id}`, data).subscribe({
                next: (response) => {
                    this._alert.setAlert(200, "Línea actualizada exitosamente!");
                },
                error: (error) => {
                    this._alert.setAlert(400, "Error al actualizar las líneas"
                    );
                }
            });
        };
    }


    public delete(id: any): void {
        this._alert.setAlert(300, "ADVERTENCIA!, ¿Seguro de eliminar la línea?. Se eliminaran datos importantes que no podran ser recuperados.");
        this._alert.confirmCallback = () => {
            this._http.delete(`${this._URI}${id}`).subscribe({
                next: (response) => {
                    this._alert.setAlert(200, "Línea eliminada exitosamente!");
                },
                error: (error) => {
                    this._alert.setAlert(400, "No se pudo eliminar la línea porque está relacionada con otros registros. Eliminarla afectaría la integridad de los datos."
                    );
                }
            });
        };
    }

}