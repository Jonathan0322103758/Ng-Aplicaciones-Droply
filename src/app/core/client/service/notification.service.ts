import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { producerNotifyConsumers } from "@angular/core/primitives/signals";
import { ClientService } from "@Client/http/http";
import { Module } from "@Interface/module.interface";
import { Notifications } from "@Interface/notifications.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _URI: string = '/module';
  private readonly _http: ClientService = inject(ClientService);
  private readonly notificationService: WritableSignal<Notifications[]> = signal<Notifications[]>([]);
  private readonly _dummyService: WritableSignal<Notifications[]> = signal<Notifications[]>([]);

  public fetch(userId?: string): Observable<Notifications[]> {
    const params = userId ? { params: { userId } } : {};

    return this._http.get<{ status: number; message: string; data: Notifications[] }>(this._URI, params).pipe(
      map(response => response.data),
      tap(notification => {
        this.notificationService.set(notification);
      }),
      catchError(error => {
        console.error('Error fetching modules:', error);
        return of([]);
      })
    );
  }


  public get(): Notifications[] {
    return this.notificationService()
  }

  public dummydata(): Notifications[] {
    const data: Notifications[] = [
      {
        _id: 0,
        type: 'Nuevos Mensajes',
        quantity: 3,
        notifications: [
          {
            _id: 10,
            messageId: 3001,
            status: false,
            state: true,
            date: '2025-07-11T20:00:00Z',
            description: 'Nuevo reporte disponible: Consumo total planta norte – Semana 27.',
            concept: 'Reporte'
          },
          {
            _id: 11,
            messageId: 3002,
            status: false,
            state: true,
            date: '2025-07-11T21:45:00Z',
            description: 'Se detectó una fuga potencial en el sistema de refrigeración.',
            concept: 'Alerta'
          },
          {
            _id: 12,
            messageId: 3003,
            status: false,
            state: true,
            date: '2025-07-11T22:10:00Z',
            description: 'Actualización de firmware disponible para medidor #A21.',
            concept: 'Sistema'
          }
        ]
      },
      {
        _id: 1,
        type: 'Archivados',
        quantity: 3,
        notifications: [
          {
            _id: 2,
            messageId: 2001,
            status: true,
            state: false,
            date: '2025-07-08T18:00:00Z',
            description: 'Se detectó un consumo superior al límite establecido en el módulo de producción A.',
            concept: 'Alerta'
          },
          {
            _id: 3,
            messageId: 2002,
            status: true,
            state: false,
            date: '2025-07-07T19:30:00Z',
            description: 'La válvula de control principal fue cerrada automáticamente por mantenimiento programado.',
            concept: 'Sistema'
          },
          {
            _id: 4,
            messageId: 2003,
            status: true,
            state: false,
            date: '2025-07-06T20:45:00Z',
            description: 'El sensor de caudal 03 dejó de enviar datos durante más de 15 minutos.',
            concept: 'Error de Sensor'
          }
        ]
      },
      {
        _id: 2,
        type: 'Leídos',
        quantity: 2,
        notifications: [
          {
            _id: 5,
            messageId: 2004,
            status: true,
            state: true,
            date: '2025-07-05T15:20:00Z',
            description: 'El reporte semanal de consumo fue generado exitosamente.',
            concept: 'Confirmación'
          },
          {
            _id: 8,
            messageId: 3006,
            status: true,
            state: true,
            date: '2025-07-07T16:50:00Z',
            description: 'Notificación: Se restableció la conexión con medidor remoto #C03.',
            concept: 'Sistema'
          }
        ]
      },
      {
        _id: 3,
        type: 'Papelera',
        quantity: 2,
        notifications: [
          {
            _id: 6,
            messageId: 2005,
            status: false,
            state: false,
            date: '2025-07-04T17:10:00Z',
            description: 'La conexión con el servidor de monitoreo fue restablecida.',
            concept: 'Sistema'
          },
          {
            _id: 7,
            messageId: 2006,
            status: false,
            state: false,
            date: '2025-07-03T18:00:00Z',
            description: 'Recordatorio: actualiza los parámetros de umbral de consumo para julio.',
            concept: 'Recordatorio'
          }
        ]
      },
      {
        _id: 4,
        type: 'Recordar más tarde',
        quantity: 1,
        notifications: [
          {
            _id: 9,
            messageId: 3010,
            status: false,
            state: true,
            date: '2025-07-10T19:00:00Z',
            description: 'Tienes pendiente la validación del consumo semanal de la zona sur.',
            concept: 'Tarea'
          }
        ]
      }
    ];

    this._dummyService.set(data);
    return this._dummyService();
  }



}