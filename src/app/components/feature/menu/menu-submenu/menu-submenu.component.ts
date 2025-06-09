import { ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Submenu } from '@Interface/ui.interface';
import { MenuService } from '@Layout/menu/menu.service';

@Component({
  selector: 'qx-menu-submenu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-submenu.component.html',
  styleUrl: './menu-submenu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDropCardComponent {
  private readonly router: Router = inject(Router);
  private readonly menuService: MenuService = inject(MenuService);
  private submenuIndex: Signal<number[]> = computed(() => this.menuService.getSubmenu());
  
  public sectionIndex = input.required<number>();
  public submenu = input.required<Submenu[]>();

  public toggleSubmenu(sectionId: number, submenuId: number): void {
    this.menuService.toggleSubmenu(sectionId, submenuId);
  }

  public activeSubmenu(sectionId: number, submenuId: number): boolean {
    return this.submenuIndex()[0] === sectionId && this.submenuIndex()[1] === submenuId;
  }

  public isActive(pages: { path: string }[]): boolean {
    return pages.some(page => this.router.url.includes(page.path));
  }
}
