import { Component, computed, inject, input, Signal } from '@angular/core';
import { PreferenceService } from '@Client/preference/preference.service';
import { BadgeComponent } from '@Component/UI/standalone';
import { Module } from '@Interface/module.interface';
import { ColorType } from '@Types_/ui.types';

@Component({
  selector: 'qx-module-card',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.scss'
})
export class ModuleCardComponent {
  public module = input.required<Module>()
  public status = input<boolean>(false)

  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color)
}
