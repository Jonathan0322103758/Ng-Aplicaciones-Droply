import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonStyle, ButtonType } from '@Types_/ui.types';

@Component({
  selector: 'qx-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  public type = input.required<ButtonType>();
  public styleClass = input.required<ButtonStyle>();
  public icon = input<string>('fas fa-question');
  public label = input<string>('text default');

  public onClick = output<void>();
  public disabled = input<boolean>(false);

  public click(): void {
    if(this.disabled() === false) {
      this.onClick.emit();
    }
  } 
}
