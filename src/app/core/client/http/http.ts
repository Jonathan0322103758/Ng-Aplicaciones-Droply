import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.getHeaders() });
  }

  post<T>(url: string, body: any): Observable<T> {
    console.log('POST:', url, body);
    return this.http.post<T>(url, body, { headers: this.getHeaders() });
  }

  put<T>(url: string, data: any): Observable<T> {
    console.log('PUT:', url, data);
    return this.http.put<T>(url, data, { headers: this.getHeaders() });
  }

  delete<T>(url: string): Observable<T> {
    console.log('DELETE:', url);
    return this.http.delete<T>(url, { headers: this.getHeaders() });
  }
}
