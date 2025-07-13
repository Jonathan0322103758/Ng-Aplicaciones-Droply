import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { PreferenceService } from '@Client/preference/preference.service';
import { MenuService } from './menu.service';
import { StatusType, TemplateType } from '@Types_/ui.types';
import { Menu } from '@Interface/ui.interface';
import { MenuSectionLabelComponent } from '@Component/feature/menu/menu-section-label/menu-section-label.component';
import { MenuCardComponent } from '@Component/feature/menu/menu-card/menu-card.component';
import { MenuDropCardComponent } from '@Component/feature/menu/menu-submenu/menu-submenu.component';
import { ButtonComponent } from '@Component/UI/standalone';

@Component({
  selector: 'qx-menu',
  standalone: true,
  imports: [MenuSectionLabelComponent, MenuCardComponent, MenuDropCardComponent, ButtonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  private readonly _menuService: MenuService = inject(MenuService);
  public status: Signal<StatusType> = computed(() => this._menuService.getStatus());
  public template: Signal<TemplateType> = computed(() => this._preferenceService.getPreference().template);
  public sections: Menu[] = this._menuService.menu;

  public changeStatus(): void {
    this._menuService.changeStatus();
  }
}
