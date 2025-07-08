import { inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { CreateUser, User } from "@Interface/user.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly _URI: string = '/user';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _userService: WritableSignal<User[]> = signal<User[]>([]);
    private readonly _user: WritableSignal<User | null> = signal<User | null>(null);


    public fetch(): Observable<User[]> {
        return this._http.get<{ status: number; message: string; data: User[] }>(this._URI).pipe(
            map(response => response.data),
            tap(users => {
                // console.log('Response:', users);
                this._userService.set(users);
            }),
            catchError(error => {
                console.error('Error fetching users:', error);
                return of([]);
            })
        );
    }

    public get(): User[] {
        return this._userService();
    }

    public getById(): User | null {
        return this._user() != null ? this._user() : null
    }

    public post(data: CreateUser): void {
        this._alert.loader()
        this._http.post<CreateUser>(this._URI, data).subscribe({
            next: (response) => {
                this._alert.setAlert(200, "Usuario registrado exitosamente!")
                console.log(response)
            },
            error: (error) => {
                console.error(error)
            }
        })
    }
}