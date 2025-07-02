import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertMainComponent } from '@Component/shared/alert-main/alert-main.component';
import { ContentComponent, HeaderComponent, MenuComponent } from '@Layout/standalone';

@Component({
  selector: 'qx-classic',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, ContentComponent, AlertMainComponent],
  templateUrl: './classic.component.html',
  styleUrl: './classic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassicComponent { /* Template Classic (default) */ }