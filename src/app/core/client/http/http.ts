import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParameterCodec } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly _URL = 'http://10.102.221.79';
  private readonly _http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  get<T>(uri: string, params?: { [key: string]: any }): Observable<T> {
    let httpParams = new HttpParams({ encoder: new CustomHttpEncoder() });

    if (params) {
      for (const key of Object.keys(params)) {
        const value = params[key];

        // Si es array, permite múltiples valores con la misma clave
        if (Array.isArray(value)) {
          value.forEach(val => httpParams = httpParams.append(key, val));
        } else {
          httpParams = httpParams.append(key, value);
        }
      }
    }

    return this._http.get<T>(`${this._URL}${uri}`, {
      headers: this.getHeaders(),
      params: httpParams
    });
  }

  post<T>(uri: string, body: any, options?: { [key: string]: any }): Observable<T> {
    console.log('POST:', `${this._URL}${uri}`, body);
    return this._http.post<T>(`${this._URL}${uri}`, body, { headers: this.getHeaders(), ...options });
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

class CustomHttpEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return key;
  }

  encodeValue(value: string): string {
    return value;
  }

  decodeKey(key: string): string {
    return key;
  }

  decodeValue(value: string): string {
    return value;
  }
}
