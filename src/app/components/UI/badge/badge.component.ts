import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonStyle, ClassType, ColorType, ShapeType } from '@Types_/ui.types';

@Component({
  selector: 'qx-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
    public text = input.required<string>();
    public styleClass = input.required<ClassType>();
}
