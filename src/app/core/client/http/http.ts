import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly _URL = 'http://localhost:9000';
  private readonly _http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
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

