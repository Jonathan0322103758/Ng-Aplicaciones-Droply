import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'qx-menu-card',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCardComponent {
  public icon = input<string>();
  public label = input.required<string>();
  public path = input.required<string>();
}
