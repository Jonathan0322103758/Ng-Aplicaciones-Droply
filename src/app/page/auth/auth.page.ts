import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { InputComponent, ButtonComponent } from '@Component/UI/standalone';

@Component({
  selector: 'page-auth',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPage {
  private readonly authService = inject(AuthService);

  public username = '';
  public email = '';
  public password = '';

  public login(): void {
    this.authService.login(this.username, this.email, this.password);
  }
}
