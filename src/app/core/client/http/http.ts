import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly _URL = 'http://192.168.1.207:8080';
  private readonly _http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTM2ODAyODAsImlkIjoxLCJyb2xlIjoyLCJ1c2VybmFtZSI6IkEwMDEifQ.Ml75tSRT1L3TvkZuBqF8dY4uusFVBe3OGl5Uf1CiwfZr6Js4RCL6hqA0AD9yNdQN30GeYOL6Bl9SdM6knDAdL82LsDoGweaLaZtgatVqQaZqSlCp2elAs_LWRnvGQwT9Mpuq3hNqsBI9jhVZaClWwzFGy_EIYVjd8koMNieRrsSU3DKYzh-mOWIurBtjdhJj2A0kqCD2Xk8CnWyj_ujkrdJe7-Gcm5hZ8-b1oCLx8LIK_Y8KI78tOnFNarka7xKAZpvSTeMcvqtqwwfU2VTZEnkJVWCf9Zx5iJg-4c0R5NFVblhLPCxNB02-DtuNWKptPxVcu1EUw_f_hLrgEC3mOw'
    });
  }

  get<T>(uri: string, params?: { [key: string]: any }): Observable<T> {
    return this._http.get<T>(`${this._URL}${uri}`, {
      headers: this.getHeaders(),
      params: params,
    });
  }

  post<T>(uri: string, body: any): Observable<T> {
    console.log('POST:', `${this._URL}${uri}`, body);
    return this._http.post<T>(`${this._URL}${uri}`, body, { headers: this.getHeaders() });
  }

  put<T>(uri: string, data: any): Observable<T> {
    console.log('PUT:', `${this._URL}${uri}`, data);
    return this._http.put<T>(`${this._URL}${uri}`, data, { headers: this.getHeaders() });
  }

  delete<T>(uri: string): Observable<T> {
    console.log('DELETE:', `${this._URL}${uri}`);
    return this._http.delete<T>(`${this._URL}${uri}`, { headers: this.getHeaders() });
  }
}

