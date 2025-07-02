import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input, OnInit, output, Signal, signal } from '@angular/core';
import { ButtonStyle, ColorType, ShapeType } from '@Types_/ui.types';
import { BadgeComponent, ButtonComponent } from '../standalone';
import { PreferenceService } from '@Client/preference/preference.service';

@Component({
  selector: 'qx-input',
  standalone: true,
  imports: [BadgeComponent, ButtonComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  /* Inputs */
  public type = input.required<string>();
  public value = input<string>('');
  public name = input<string>('none');
  public label = input<string>();
  public placeholder = input<string>();
  public required = input<boolean>(false);
  public disabled = input<boolean>(false);

  /* Styles */
  public styleClass = input<ShapeType>();

  /* Actions */
  public valueChange = output<string>();
  public internalValue = signal(this.value());
  public isRequired = signal<boolean>(false);

  public isType = signal<string>('');
  public isEye = signal<string>('fas fa-eye-slash');
  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color); 

  constructor() {
    let lastExternalValue = this.value();
  
    effect(() => {
      const externalValue = this.value();
  
      if (externalValue !== lastExternalValue) {
        lastExternalValue = externalValue;
        this.internalValue.set(externalValue);
        this._cdr.markForCheck();
      }
    }, { allowSignalWrites: true });
  }
  

  public onChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.internalValue.set(newValue);
    this.valueChange.emit(newValue);

    this.isRequired.set(this.required() && !newValue);
  }

  public onBlur(): void {
    this.isRequired.set(this.required() && !this.internalValue());
  }

  public viewPassword(): void {
    this.isType.set(this.isType() === 'text' ? 'password' : 'text');
    this.isEye.set(this.isEye() === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye');
  }

  public buttonStyle(): ButtonStyle {
    return `rounded ${this.accentColor()}-ghost` as ButtonStyle;
    
  }

  ngOnInit(): void {
      this.isType.set(this.type());
      this.internalValue.set(this.value());
  } 
  
}
