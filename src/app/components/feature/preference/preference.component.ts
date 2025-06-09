import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '@Component/UI/button/button.component';
import { Preference } from '@Interface/ui.interface';
import { PreferenceService } from '@Client/preference/preference.service';
import { ButtonStyle, ColorType, ThemeType } from '@Types_/ui.types';
import { TitleHeaderComponent } from '@Component/shared/title-header/title-header.component';

@Component({
  selector: 'qx-preference',
  standalone: true,
  imports: [ButtonComponent, TitleHeaderComponent],
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferenceComponent {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);  
  public preference: Signal<Preference> = computed(() => this._preferenceService.getPreference());

  public colorPalette: ColorType[] = this._preferenceService.loadColorPalette();
  public themes: ThemeType[] = this._preferenceService.loadThemes();
  public status: WritableSignal<string> = signal<string>('closed');
  public icon: WritableSignal<string> = signal<string>('fas fa-gear fa-spin');

  public statusSettings(): void {
    this.status.set(this.status() === 'closed' ? 'open' : 'closed');
    this.icon.set(this.status() === 'open' ? 'fas fa-close' : 'fas fa-gear fa-spin');
  }

  public colorSelected(color: ColorType): boolean {
    return this.preference().color === color;
  }

  public themeSelected(theme: ThemeType): boolean {
    return this.preference().theme === theme;
  }

  public setColor(color: ColorType): void {
    this._preferenceService.setPreference({color: color});
  }

  public setTheme(theme: ThemeType): void {
    this._preferenceService.setPreference({theme: theme});
  }

  public buttonStyle(): ButtonStyle {
    const color = this.preference().color;
    return `rounded ${color}` as ButtonStyle;
  }

}
