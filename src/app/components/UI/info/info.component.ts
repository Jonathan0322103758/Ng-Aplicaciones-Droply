import { Component, computed, inject, input, Signal } from '@angular/core';

@Component({
  selector: 'qx-info',
  standalone: true,
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  public info = input.required<string>();
  public outline = input<boolean>(false);
  public icon = input<boolean>(true);
}
