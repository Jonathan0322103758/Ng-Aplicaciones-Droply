import { Injectable, signal, WritableSignal } from "@angular/core";
import { Menu } from "@Interface/ui.interface";
import { StatusType } from "@Types_/ui.types";

@Injectable({providedIn: 'root'})
export class MenuService {
  private readonly _status: WritableSignal<StatusType> = signal<StatusType>('closed');
  private readonly _activeSubmenu: WritableSignal<number[]> = signal<number[]>([0,0]);
  private readonly _padlock: WritableSignal<boolean> = signal<boolean>(true);

  public readonly menu: Menu[] = [
    {
      id: 0,
      section: 'Principal',
      pages: [
        { id: 0, label: 'Inicio', path: 'home', icon: 'house-chimney' },
      ]
    },
    {
        id: 1,
        section: 'Administración',
        submenus: [
          {
            id: 0,
            icon: 'user',
            label: 'Usuarios',
            pages: [
              { id: 0, label: 'Administración de Usuarios', path: 'admin-users' },
              { id: 1, label: 'Roles y Permisos', path: 'admin-permitions' },
            ]
          },
        ],
        pages: [
          { id: 0, label: 'Notificaciones', path: 'admin-notifications', icon: 'bell' },
          { id: 1, label: 'Medidores', path: 'admin-meters', icon: 'stopwatch' },
        ]
      },
      {
        id: 2,
        section: 'Gestión Hídrica',
        submenus: [
          {
            id: 0,
            icon: 'droplet',
            label: 'Lineas de Agua',
            pages: [
              { id: 0, label: 'Monitores', path: 'none' },
              { id: 1, label: 'Lecturas', path: 'none' },
              { id: 2, label: 'Medidores', path: 'none' },
            ]
          },
          {
            id: 1,
            icon: 'chart-column',
            label: 'Costos y Tarifas',
            pages: [
              { id: 0, label: 'Tarifas de Agua', path: 'none' },
              { id: 1, label: 'Cálculo de Costos', path: 'none' },
            ]
          },
        ]
      },
      {
        id: 3,
        section: 'Operación General',
        submenus: [
          {
            id: 0,
            icon: 'screwdriver-wrench',
            label: 'Actividades',
            pages: [
              { id: 0, label: 'General', path: 'none'},
              { id: 1, label: 'Espacio Personal', path: 'general-operation-activities'},
              { id: 2, label: 'Bitácoras', path: 'none'}
            ]
          },
          {
            id: 1,
            icon: 'folder',
            label: 'Reportes',
            pages: [
              { id: 0, label: 'Subir Reporte', path: 'none'},
              { id: 1, label: 'Histórico', path: 'none'},
            ]
          }
        ]
      }
  ];

  public getStatus(): StatusType {
      return this._status();
  }

  public getSubmenu(): number[] {
      return this._activeSubmenu();
  }

  public changeStatus(): void {
      this._activeSubmenu.set([0,0]);
      this._status() === 'open' ? this._status.set('closed'): this._status.set('open');
  }

  public toggleSubmenu(sectionId: number, submenuId: number): void {
      this._status() === 'closed' ? this.changeStatus() : null;
      this._activeSubmenu.update(currentId => {
        return (currentId[0] === sectionId && currentId[1] === submenuId) ? [0, 0] : [sectionId, submenuId];
      });
  }

  public toggleLock(): void {
      this._padlock.set(!this._padlock());
  }
      
}