import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AreasService {
    private readonly _URI: string = '/areasIndustriales/';
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _http: ClientService = inject(ClientService);
    private readonly _areasSignal: WritableSignal<any[]> = signal<any[]>([]);

    public fetch(): Observable<any[]> {
        const loaderTimeout = this._alert.delayedLoader();
        return this._http.get<{ status: number; message: string; data: any[] }>(`${this._URI}`).pipe(
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
        console.log(this._areasSignal())
        return this._areasSignal();
    }

    public post(data: any): void {
        this._alert.loader();
        this._http.post<any>(this._URI, data).subscribe({
            next: (response) => {
                this._alert.setAlert(200, `Área registrada exitosamente!, nueva área: ${response.data.Nombre}`);
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al registrar el área")
            }
        })

    }

    public put(data: any): void {
        this._alert.setAlert(100, "¿Seguro de actualizar el registro de área?");
        this._alert.confirmCallback = () => {
            this._http.put(`${this._URI}${data.Id}`, data).subscribe({
                next: (response) => {
                    this._alert.setAlert(200, "Área actualizada exitosamente!");
                },
                error: (error) => {
                    this._alert.setAlert(400, "Error al actualizar las áreas"
                    );
                }
            });
        };
    }


    public delete(id: any): void {
        this._alert.setAlert(300, "ADVERTENCIA!, ¿Seguro de eliminar el área?. Se eliminaran datos importantes que no podran ser recuperados.");
        this._alert.confirmCallback = () => {
            this._http.delete(`${this._URI}${id}`).subscribe({
                next: (response) => {
                    this._alert.setAlert(200, "Área eliminada exitosamente!");
                },
                error: (error) => {
                    this._alert.setAlert(400, "No se pudo eliminar el área porque está relacionada con otros registros. Eliminarla afectaría la integridad de los datos."
                    );
                }
            });
        };
    }

}