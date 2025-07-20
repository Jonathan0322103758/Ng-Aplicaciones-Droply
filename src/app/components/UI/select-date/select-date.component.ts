import { Component, computed, inject, input, Signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PreferenceService } from '@Client/preference/preference.service';
import { ColorType } from '@Types_/ui.types';

@Component({
  selector: 'qx-select-date',
  standalone: true,
  providers: [BrowserAnimationsModule, provideNativeDateAdapter()],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.scss'
})
export class SelectDateComponent {
  public label = input.required<string>()

  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color)
}
