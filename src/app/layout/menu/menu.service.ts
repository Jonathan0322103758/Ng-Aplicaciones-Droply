import { Injectable, signal, WritableSignal } from "@angular/core";
import { Menu } from "@Interface/ui.interface";
import { StatusType } from "@Types_/ui.types";

@Injectable({providedIn: 'root'})
export class MenuService {
  private readonly _status: WritableSignal<StatusType> = signal<StatusType>('open');
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
    // {
    //     id: 1,
    //     section: 'Gestión de Nómina',
    //     submenus: [
    //       {
    //         id: 0,
    //         icon: 'user-tie',
    //         label: 'Empleados',
    //         pages: [
    //           { id: 0, label: 'Lista de Empleados', path: 'employee/list-employee' },
    //           { id: 1, label: 'Registro de Empleados', path: 'employee/register-employee' },
    //         ]
    //       },
    //       {
    //         id: 1,
    //         icon: 'calculator',
    //         label: 'Cálculo de Salarios',
    //         pages: [
    //           { id: 0, label: 'Configuración de Cálculo de Nómina', path: 'calculation-salary/payroll-calculation-settings' },
    //         ]
    //       },

    //     ],
    //   },
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