import { Component, computed, inject, Signal } from '@angular/core';
import { PreferenceService } from '@Client/preference/preference.service';
import { ButtonComponent } from '@Component/UI/standalone';
import { ButtonStyle, ColorType } from '@Types_/ui.types';

@Component({
  selector: 'qx-module-list',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.scss'
})
export class ModuleListComponent {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color)

  modules = [
    { _id: 0, name: "Usuarios", icon: "user", status: false },
    { _id: 0, name: "Notificaciones", icon: "bell", status: false },
    { _id: 0, name: "Medidores", icon: "stopwatch", status: false },
    { _id: 0, name: "Lineas de Agua", icon: "droplet", status: false },
    { _id: 0, name: "Costos y Tarifas", icon: "chart-column", status: false },
    { _id: 0, name: "Actividades", icon: "screwdriver-wrench", status: false },
    { _id: 0, name: "Reportes", icon: "folder", status: false },
  ]

  selectedModules: any[] = [];

  sendModules(module: any, checked: boolean): void {
    module.status = checked;

    if (checked) {
      if (!this.selectedModules.includes(module)) {
        this.selectedModules.push(module);
      }
    } else {
      this.selectedModules = this.selectedModules.filter(m => m !== module);
    }
  }

  public buttonStyle(): ButtonStyle {
    const color = this.accentColor();
    return `rounded ${color}-ghost` as ButtonStyle;
  }

}
