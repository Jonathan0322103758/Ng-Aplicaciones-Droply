import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '@Component/UI/standalone';

@Component({
  selector: 'qx-demo-landing',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './demo-landing.component.html',
  styleUrl: './demo-landing.component.scss'
})
export class DemoLandingComponent {
  public status: boolean = false;
}
