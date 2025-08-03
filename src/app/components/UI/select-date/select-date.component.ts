import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import { FormsModule } from "@angular/forms";
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDateFormats,
  provideNativeDateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.scss',
})
export class SelectDateComponent {
  public label = input.required<string>();
  public dateInput = input<Date | undefined>();

  private internalDate = signal<Date | null>(null);
  public date = this.internalDate;

  public dateChange = output<Date | null>();

  constructor() {
    effect(() => {
      const inputValue = this.dateInput();
      if (inputValue && inputValue.getTime() !== this.internalDate()?.getTime()) {
        this.internalDate.set(inputValue);
      }
    }, { allowSignalWrites: true });
  }


  onDateChange(event: Event) {
    const inputEvent = event as unknown as MatDatepickerInputEvent<Date | null>;
    const value = inputEvent.value;
    this.internalDate.set(value);
    this.dateChange.emit(value);
    console.log(inputEvent.value)
  }




}
