import { Component, input, output, signal, effect, inject, computed, Signal, ChangeDetectionStrategy } from '@angular/core';
import { PreferenceService } from '@Client/preference/preference.service';
import { Dropdown } from '@Interface/ui.interface';
import { ClassType, ColorType } from '@Types_/ui.types';

@Component({
  selector: 'qx-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color)

  public options = input.required<Dropdown[]>();
  public label = input.required<string>();
  public placeholder = input<string>('Seleccionar opción');
  public selectedValue = input<any>(null); // input externo
  public selectedValueChange = output<any>();

  public selectionChange = output<any>();
  public open = signal(false);
  public styleClass = input<ClassType>();
  public required = input<boolean>();

  // Valor seleccionado interno
  public internalSelected = signal<any>(this.selectedValue());

  constructor() {
    effect(() => {
      const external = this.selectedValue();
      const selectedOption = this.options().find(opt => opt.value === external);
      if (selectedOption && selectedOption !== this.internalSelected()) {
        this.internalSelected.set(selectedOption);
      }
    }, { allowSignalWrites: true });


  }


  public toggleDropdown(): void {
    this.open.update((v) => !v);
  }

  public selectOption(option: any): void {
    this.internalSelected.set(option);
    this.selectionChange.emit(option);
    this.selectedValueChange.emit(option.value);
    this.open.set(false);
  }
}
