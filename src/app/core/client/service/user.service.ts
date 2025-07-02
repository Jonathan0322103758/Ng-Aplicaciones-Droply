import { inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { ClientService } from "@Client/http/http";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { CreateUser, User } from "@Interface/user.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly _url: string = 'http://localhost:9000/user';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly _userService: WritableSignal<User[]> = signal<User[]>([]);
    private readonly dummyUsers: User[] = [
        {
            _id: 0,
            name: 'Jonathan Martinez Zavala',
            email: '0322103758@ut-tijuana.edu.mx',
            number: '0322103758',
            rol: 'Desarrollador',
            status: true
        },
        {
            _id: 1,
            name: 'Andrea Guadalupe Quintana Zepeda',
            email: '0322103758@ut-tijuana.edu.mx',
            number: '03221037593',
            rol: 'Desarrollador',
            status: true
        },
        {
            _id: 2,
            name: 'Juan Antonio Avalos Garcia',
            email: '0322103758@ut-tijuana.edu.mx',
            number: '0322103758',
            rol: 'Desarrollador',
            status: true
        },
        {
            _id: 3,
            name: 'Miguel Isaac Garcia Lopez',
            email: '0322103717@ut-tijuana.edu.mx',
            number: '0322103717',
            rol: 'Desarrollador',
            status: true
        },
        {
            _id: 4,
            name: 'José De Jesús Ponce Duarte',
            email: '0322103790@ut-tijuana.edu.mx',
            number: '0322103790',
            rol: 'Desarrollador',
            status: true
        },
        {
            _id: 5,
            name: 'Cesia Nuemi Ochoa Huerta',
            email: '0322103758@ut-tijuana.edu.mx',
            number: '0322103758',
            rol: 'Desarrollador',
            status: true
        },
    ] as const;

    getDummyUsers(): User[] {
        return this.dummyUsers
    }

    public fetch(): Observable<User[]> {
        return this._http.get<{ status: number; message: string; data: User[] }>(this._url).pipe(
            map(response => response.data),
            tap(users => {
                // console.log('Response:', users);
                this._userService.set(users);
            }),
            catchError(error => {
                // console.error('Error fetching users:', error);
                return of([]);
            })
        );
    }

    public get(): User[] {
        return this._userService();
    }

    public post(data: CreateUser): void {
        this._alert.loader()
        this._http.post<CreateUser>(this._url, data).subscribe({
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