import { Component, effect, input, signal, } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDateFormats, provideNativeDateAdapter, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'qx-select-date',
  standalone: true,
  providers: [BrowserAnimationsModule, provideNativeDateAdapter(), { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.scss'
})
export class SelectDateComponent {
  public label = input.required<string>();
  public dateInput = input<Date | undefined>();

  public date = signal<Date | null>(new Date());
  public minDate = new Date('2025-01-01');
  
  constructor() {
    effect(() => {
      if (this.dateInput()) {
        this.date.set(this.dateInput()!);
      }
    }, { allowSignalWrites: true });
  }
}
