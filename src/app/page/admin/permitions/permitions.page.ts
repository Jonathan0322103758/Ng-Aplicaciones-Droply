import { ChangeDetectionStrategy, Component, computed, inject, Signal } from "@angular/core";
import { PreferenceService } from "@Client/preference/preference.service";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, InfoComponent } from "@Component/UI/standalone";
import { ButtonStyle, ColorType } from "@Types_/ui.types";

@Component({
    selector: 'page-permitions',
    standalone: true,
    imports: [TitleHeaderComponent, InfoComponent, ButtonComponent],
    templateUrl: './permitions.page.html',
    styleUrl: './permitions.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermitionsPage {
    private readonly preference: PreferenceService = inject(PreferenceService)
    public accentColor: Signal<ColorType> = computed(() => this.preference.getPreference().color)

    public listaRoles = [
        { _id: 0, name: 'Administrador', description: 'Control total del sistema' },
        { _id: 1, name: 'Gerente', description: 'Gestión y supervisión general' },
        { _id: 2, name: 'Auditor', description: 'Revisión y análisis de datos' },
    ];

  public buttonStyle(): ButtonStyle {
    const color = this.accentColor();
    return `rounded ${color}-ghost` as ButtonStyle;
  }
}