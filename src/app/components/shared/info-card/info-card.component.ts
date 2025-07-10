import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ColorType } from '@Types_/ui.types';

@Component({
  selector: 'qx-info-card',
  standalone: true,
  imports: [],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoCardComponent {
  public color = input.required<ColorType>();
  public icon = input.required<string>();
  public title = input.required<string>();
  public text = input<string>();
  public info = input<string>();
}
