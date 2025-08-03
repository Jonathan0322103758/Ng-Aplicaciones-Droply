import { inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { CreateUser, User, Usuario } from "@Interface/user.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly _URI: string = '/users/';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _userService: WritableSignal<Usuario[]> = signal<Usuario[]>([]);
    private readonly _user: WritableSignal<User | null> = signal<User | null>(null);


    public fetch(): Observable<Usuario[]> {
        const loaderTimeout = this._alert.delayedLoader();
        return this._http.get<{ status: number; message: string; data: Usuario[] }>(this._URI).pipe(
            map(response => response.data),
            tap(users => {
                clearTimeout(loaderTimeout);
                this._userService.set(users);
                this._alert.clean();
            }),
            catchError(error => {
                clearTimeout(loaderTimeout);
                error.status !== 403 ? this._alert.setAlert(400, "Error al obtener los usuarios"): null;
                return of([]);
            })
        );
    }

    public get(): Usuario[] {
        return this._userService();
    }

    public getById(): User | null {
        return this._user() != null ? this._user() : null
    }

    public post(data: any): void {
        this._alert.loader()
        this._http.post<Usuario>(this._URI, data).subscribe({
            next: (response) => {
                this._alert.setAlert(200, "Usuario registrado exitosamente!")
                console.log(response)
            },
            error: (error) => {
                error.status !== 403 ? this._alert.setAlert(400, "Error al registrar el usuario") : false;
            }
        })
    }

    public put(data: any): void {
        this._alert.loader()
        this._http.put<Usuario>(`${this._URI}${data.ID}`, data).subscribe({
            next: (response) => {
                this._alert.setAlert(200, "Usuario actualizado exitosamente!")
                console.log(response)
            },
            error: (error) => {
                error.status !== 403 ? this._alert.setAlert(400, "Error al actualizar el usuario") : false
            }
        })
    }

    public delete(data: any): void {
        this._alert.setAlert(100, "¿Seguro de eliminar el usuario?");
        this._alert.confirmCallback = () => {
            this._http.delete(`${this._URI}${data.ID}`).subscribe({
                next: (response) => {
                    this._alert.setAlert(200, "¡Usuario eliminado exitosamente!");
                },
                error: (error) => {
                    error.status !== 403 ? this._alert.setAlert(400, "Error al eliminar el usuario") : false
                }
            });
        };
    }

}