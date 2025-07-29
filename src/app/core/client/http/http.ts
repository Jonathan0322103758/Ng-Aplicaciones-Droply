import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly _URL = 'http://192.168.1.118:8080';
  private readonly _http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTM3NjE5OTUsImlkIjoxLCJyb2xlIjoyLCJ1c2VybmFtZSI6IkEwMDEifQ.P2UDWo4dtrNKFle0A8Camdds1QRVoB6_WCd-D1FYUAsMVQDw11F7AbRaNl4sYqfUi_DN_u8amsKkKaYtTT7oM8-r2N7ZjTyl7wH9iP_fPmaXZ1iR_wYWYCJ-uwHEi_MUwwdWrOmIj-ih9VKGc8NbRwHLVCeR2LmwxJYAWS9qLSS11NPvu3n1mGRkCvNj7jSyrEJPqUNSqNEyPNht5crwT4cPg7CMfq84ZUvCs0kAzou8Md7YGwUvPL_8HK0dkVZmiwSiaUSyzFFZ9eevmadoBavC4Wrse2m3AtH5LM3f3ZsV4a29J5tXquLTD3WFceQ3CkUhXg8paPOCPK7KLGlAHQ'
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

