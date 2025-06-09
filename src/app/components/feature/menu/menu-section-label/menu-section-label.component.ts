import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'qx-menu-section-label',
  standalone: true,
  imports: [],
  templateUrl: './menu-section-label.component.html',
  styleUrl: './menu-section-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuSectionLabelComponent {
  public label = input.required<string>();
}
