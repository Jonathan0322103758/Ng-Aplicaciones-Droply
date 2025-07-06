import { ChangeDetectionStrategy, Component, computed, inject, input, output, Signal } from '@angular/core';
import { PreferenceService } from '@Client/preference/preference.service';
import { User } from '@Interface/user.interface';
import { ButtonStyle, ColorType } from '@Types_/ui.types';

@Component({
  selector: 'qx-user-card-settings',
  standalone: true,
  imports: [],
  templateUrl: './user-card-settings.component.html',
  styleUrl: './user-card-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardSettingsComponent {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);

  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color);
  public user = input.required<User>();

  public buttonStyle(): ButtonStyle {
    return `square ${this.accentColor()}-ghost` as ButtonStyle;
  }
}