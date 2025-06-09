import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, Signal, Type } from '@angular/core';
import { Preference } from '@Interface/ui.interface';
import { PreferenceService } from '@Client/preference/preference.service';
import { TemplateType } from '@Types_/ui.types';
import { ClassicComponent } from './classic/classic.component';

@Component({
  selector: 'qx-template',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent {
  private preferenceService: PreferenceService = inject(PreferenceService);
  private template: Record<TemplateType, Type<Component>> = {
    classic: ClassicComponent
  };
  
  public preference: Signal<Preference> = computed(() => this.preferenceService.getPreference());
  public templateComponent: Signal<Type<Component>> = computed(() => {
    return this.template[this.preference().template];
  })

  constructor() {
    if(typeof document !== 'undefined') {
      effect(() => {
        document.body.className = '';
        document.body.classList.add(`theme-${this.preference().theme}`);
      });
    }
  }
}
