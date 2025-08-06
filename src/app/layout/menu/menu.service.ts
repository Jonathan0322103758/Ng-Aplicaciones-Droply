import { Injectable, signal, WritableSignal } from "@angular/core";
import { Menu } from "@Interface/ui.interface";
import { StatusType } from "@Types_/ui.types";

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly _status: WritableSignal<StatusType> = signal<StatusType>('closed');
  private readonly _activeSubmenu: WritableSignal<number[]> = signal<number[]>([0, 0]);
  private readonly _padlock: WritableSignal<boolean> = signal<boolean>(true);

  private readonly _allowedPathsByRole: Record<number, string[]> = {
    // 1: ['home', 'admin-users', 'admin-permitions', 'admin-database', 'admin-notifications', 'manage-meters', 'manage-areas', 'general-operation-progress', 'general-operation-activities', 'general-operation-logs', 'reports-add-reports'],
    1: ['home', 'admin-users', 'admin-permitions', 'admin-database', 'admin-notifications', 'manage-meters', 'manage-areas', 'general-operation', 'general-operation-progress', 'general-operation-activities', 'general-operation-logs', 'reports-add-reports'],
    2: ['home', 'admin-notifications', 'manage-meters', 'manage-areas', 'general-operation-progress', 'general-operation-activities', 'general-operation-logs', 'reports-add-reports'],
    3: ['home', 'admin-notifications', 'manage-meters', 'general-operation-progress', 'general-operation-activities', 'reports-add-reports'],
  };

  private getUserRole(): number | null {
    const token = typeof window !== 'undefined' && localStorage.getItem('token');
    if (!token) return null;

    try {
      const [, payload] = token.split('.');
      const decoded = JSON.parse(atob(payload));
      return decoded.role;
    } catch {
      return null;
    }
  }

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
        { id: 0, label: 'Base de datos', path: 'admin-database', icon: 'database' },
        { id: 1, label: 'Notificaciones', path: 'admin-notifications', icon: 'bell' },
      ]
    },
    {
      id: 2,
      section: 'Gestión Hídrica',
      submenus: [
        {
          id: 0,
          icon: 'droplet',
          label: 'Líneas de Agua',
          pages: [
            // { id: 0, label: 'Monitores', path: 'none' },
            // { id: 1, label: 'Lecturas', path: 'none' },
            { id: 2, label: 'Medidores', path: 'manage-meters' },
            { id: 2, label: 'Áreas y líneas de agua', path: 'manage-areas' },
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
            { id: 0, label: 'General', path: 'general-operation' },
            { id: 0, label: 'Progreso', path: 'general-operation-progress' },
            { id: 1, label: 'Espacio Personal', path: 'general-operation-activities' },
            { id: 2, label: 'Bitácoras', path: 'general-operation-logs' }
          ]
        },
        {
          id: 1,
          icon: 'folder',
          label: 'Reportes',
          pages: [
            { id: 0, label: 'Subir Reporte', path: 'reports-add-reports' },
            { id: 1, label: 'Histórico', path: 'none' },
          ]
        }
      ]
    }
  ];

  public filterMenuByRole(): Menu[] {
    const userRole = this.getUserRole();
    if (userRole === null) return [];

    const allowedPaths = this._allowedPathsByRole[userRole] || [];

    return this.menu
      .map(section => {
        const filteredPages = section.pages?.filter(page =>
          allowedPaths.includes(page.path)
        );

        const filteredSubmenus = section.submenus
          ?.map(sub => {
            const filteredSubPages = sub.pages.filter(page =>
              allowedPaths.includes(page.path)
            );
            return filteredSubPages.length > 0 ? { ...sub, pages: filteredSubPages } : null;
          })
          .filter(Boolean);

        if ((filteredPages && filteredPages.length > 0) || (filteredSubmenus && filteredSubmenus.length > 0)) {
          return {
            ...section,
            pages: filteredPages,
            submenus: filteredSubmenus
          };
        }

        return null;
      })
      .filter(Boolean) as Menu[];
  }



  public getStatus(): StatusType {
    return this._status();
  }

  public getSubmenu(): number[] {
    return this._activeSubmenu();
  }

  public changeStatus(): void {
    this._activeSubmenu.set([0, 0]);
    this._status() === 'open' ? this._status.set('closed') : this._status.set('open');
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