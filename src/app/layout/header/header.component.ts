import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@Component/UI/button/button.component';
import { MenuService } from '@Layout/menu/menu.service';
import { AuthService } from '@Page/auth/auth.service';

@Component({
  selector: 'qx-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly _menuService: MenuService = inject(MenuService);
  private readonly _authService: AuthService = inject(AuthService);
  
  public toggleBar(): void {
    this._menuService.changeStatus();
  }

  public logout(): void {
    this._authService.logout();
  }
}
