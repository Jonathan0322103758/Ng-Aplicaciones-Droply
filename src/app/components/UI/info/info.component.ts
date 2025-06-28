import { Component, computed, inject, input, Signal } from '@angular/core';
import { PreferenceService } from '@Client/preference/preference.service';
import { ColorType } from '@Types_/ui.types';

@Component({
  selector: 'qx-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color);

  public info = input.required<string>();
  public outline = input<boolean>(false);
}
