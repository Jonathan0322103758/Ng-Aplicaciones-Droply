import { Injectable, signal, WritableSignal } from "@angular/core";
import { Preference } from "@Interface/ui.interface";
import { ColorType, ThemeType } from "@Types_/ui.types";

@Injectable({ providedIn: 'root' })
export class PreferenceService {
  private readonly _defaultPreference: Preference = { template: 'classic', theme: 'normal', color: 'primary', lenguge: 'ES' };
  private readonly _preference: WritableSignal<Preference> = signal<Preference>(this.loadPreference());

  public getPreference(): Preference {
    return this._preference();
  };

  public loadColorPalette(): ColorType[] {
    const listColor: ColorType[] = [
      'primary',
      'secondary',
      'success',
      'danger',
      'orange',
      'warning',
    ];

    return listColor;
  };

  public loadThemes(): ThemeType[] {
    const listTheme: ThemeType[] = [
      'normal',
      'light',
      'dark',
      'alternative',
    ]
    return listTheme;
  };
  
  public setPreference(preference: Partial<Preference>): void {
    this._preference.update(current => {
      const updated = { ...current, ...preference };
      localStorage.setItem('Preference', JSON.stringify(updated));
      return updated;
    });
  };
  
  private loadPreference(): Preference {
    if (typeof window !== 'undefined' && localStorage) {
      const storedPreference = localStorage.getItem('Preference');
      const preference: Preference | null = storedPreference ? JSON.parse(storedPreference) : null;
      return preference ?? this._defaultPreference;
    }
  
    return this._defaultPreference;
  };    
}