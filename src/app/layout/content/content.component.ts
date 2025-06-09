import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'qx-content',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {/* Page Content */}
