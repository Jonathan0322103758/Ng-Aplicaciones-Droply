import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '@Client/http/http';
import { AlertMainService } from '@Component/shared/alert-main/alert-main.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly _URI: string = '/auth';
    private readonly _http: ClientService = inject(ClientService);
    private readonly _alert: AlertMainService = inject(AlertMainService);
    private readonly router = inject(Router);

    public login(username: string, email: string, password: string): void {
        this._alert.loader()
        this._http.post(`${this._URI}/sign-in`, { username: username, email: "", password: password }).subscribe({
            next: (response: any) => {
                if (response?.data) {
                    localStorage.setItem('token', response.data);
                    console.log('Login successful:', response);
                    this.router.navigate(['/home']);
                }
                this._alert.setAlert(200, "Bienvenido!");
                console.log('Login successful:', response);
            },
            error: (error) => {
                this._alert.setAlert(400, "Error al iniciar sesión, credenciales inválidas.");
            }
        });
    }

    public logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/auth']);
    }

}
