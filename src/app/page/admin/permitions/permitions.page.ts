import { ChangeDetectionStrategy, Component, computed, inject, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { PreferenceService } from "@Client/preference/preference.service";
import { RoleModulesListComponent } from "@Component/feature/permisions/role-modules-list/role-modules-list.component";
import { UserRolListComponent } from "@Component/feature/users/user-rol-list/user-rol-list.component";
import { InfoCardComponent } from "@Component/shared/info-card/info-card.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, InfoComponent } from "@Component/UI/standalone";
import { ButtonStyle, ColorType } from "@Types_/ui.types";

@Component({
  selector: 'page-permitions',
  standalone: true,
  imports: [TitleHeaderComponent, InfoComponent, ButtonComponent, InfoCardComponent, RoleModulesListComponent, UserRolListComponent],
  templateUrl: './permitions.page.html',
  styleUrl: './permitions.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermitionsPage {
  private readonly preference: PreferenceService = inject(PreferenceService)
  private readonly router: Router = inject(Router);
  public accentColor: Signal<ColorType> = computed(() => this.preference.getPreference().color)
  public query: boolean = false;

  public listaRoles = [
    { _id: 0, name: 'Administrador', description: 'Control total del sistema' },
    { _id: 1, name: 'Gerente', description: 'Gestión y supervisión general' },
    { _id: 2, name: 'Auditor', description: 'Revisión y análisis de datos' },
  ];

  public buttonStyle(): ButtonStyle {
    const color = this.accentColor();
    return `rounded ${color}-ghost` as ButtonStyle;
  }

  public goToCreateUser(): void {
    this.router.navigate(['/admin-users']);
  }

  public callQuery(): void {
    this.query = !this.query;
  }

}