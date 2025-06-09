import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@Component/UI/button/button.component';
import { MenuService } from '@Layout/menu/menu.service';

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
  
  public toggleBar(): void {
    this._menuService.changeStatus();
  }
}
