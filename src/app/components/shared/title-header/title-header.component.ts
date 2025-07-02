import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { PreferenceService } from '@Client/preference/preference.service';
import { ColorType } from '@Types_/ui.types';

@Component({
  selector: 'qx-title-header',
  standalone: true,
  templateUrl: './title-header.component.html',
  styleUrl: './title-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleHeaderComponent {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color);

  public title = input.required<string>();
  public subtitle = input<boolean>(false);
  public icon = input<string>();
}
