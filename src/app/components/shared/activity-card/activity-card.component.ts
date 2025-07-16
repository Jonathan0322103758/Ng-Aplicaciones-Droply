import { Component, input } from '@angular/core';

@Component({
  selector: 'qx-activity-card',
  standalone: true,
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.scss'
})
export class ActivityCardComponent {
  public title = input.required<string>();
  public fromTo = input.required<string>();
  public summary = input<string>();
  public status = input<string>();

}
