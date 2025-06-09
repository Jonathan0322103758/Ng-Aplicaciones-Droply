import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TemplateComponent } from '@Template/template.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {/* App Container */}
