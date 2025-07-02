import { ChangeDetectionStrategy, Component, input, OnInit, output, signal } from '@angular/core';
import { Checkout } from '@Interface/ui.interface';
import { ClassType, ShapeType } from '@Types_/ui.types';

@Component({
  selector: 'qx-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {
  /* Inputs */
  public id = input.required<number>();
  public styleClass = input.required<ClassType>();
  public value = input.required<string>();
  public check = input<boolean>(false);
  public alias = input<string>();
  public bold = input<boolean>();

  /* Output */
  public valueChange = output<Checkout>();
  public internalValue = signal<boolean>(false);

  /* onChange */
  public onChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.internalValue.set(isChecked);

    this.valueChange.emit({ id: this.id(), checked: isChecked, value: this.value() });
  }

  ngOnInit(): void {
      this.internalValue.set(this.check());
  }
}
