import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ClientService } from '@Client/http/http';

@Injectable({ providedIn: 'root' })
export class SubscribeService {
  protected readonly _http = inject(ClientService);

  protected data: WritableSignal<any[]> = signal<any[]>([]);

  load(url: string) {
    this._http.get(url).subscribe(response => this.data.set(response));
  }

  get(): any[] {
    return this.data();
  }

  getById(id: string) {
    return this.data().find(item => item.id === id);
  }

  add(url: string, item: any) {
    this._http.post(url, item).subscribe(response => {
      this.data.update(list => [...list, response]);
    });
  }

  delete(url: string, id: string) {
    this._http.delete(`${url}/${id}`).subscribe(() => {
      this.data.update(list => list.filter(item => item.id !== id));
    });
  }

  update(url: string, id: string, updatedData: any) {
    this._http.update(`${url}/${id}`, updatedData).subscribe(response => {
      this.data.update(list => list.map(item => item.id === id ? response : item));
    });
  }
}
