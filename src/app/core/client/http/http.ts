import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly _URL = 'http://raspberrypi2.local';
  private readonly _http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTM4MzMxOTcsImlkIjoxLCJyb2xlIjoyLCJ1c2VybmFtZSI6IkEwMDEifQ.UeB1odceMURsXw8jIikYP2xmxKjewXuDWycFxdhis1drWiVZZni8ENU41wltNAjzXJ4VvAyFunV5gpi-kt5tIxBEAMclxZL5AJpqG1g_xYM9bNryUsdvtGdyy4L8Iahit1ia-eiYR_qipWa-H4BCFvXy6QYi22pBz1PEyV_na2YoRH7_XHUCnwP38o6joJLmqx0td8-XqsM88WJeeBbIo9wWU0VvmGODYPOaPZpKGk6Q_f4-QrIyLGP88gS5VAnJpxDAKqFQyLfydv2xS9iVnkz8oBAsAwNhgUhHOLQUDzatpyc8bowhiOoAd7bOivvJaOxEz8roHV2lGLtchrM83Q'
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

