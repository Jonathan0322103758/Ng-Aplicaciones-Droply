import { ChangeDetectionStrategy, Component, computed, inject, Signal } from "@angular/core";
import { PreferenceService } from "@Client/preference/preference.service";
import { UserListComponent } from "@Component/feature/users/user-list/user-list.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent } from "@Component/UI/button/button.component";
import { DropdownComponent } from "@Component/UI/dropdown/dropdown.component";
import { InputComponent } from "@Component/UI/standalone";
import { Dropdown, Preference } from "@Interface/ui.interface";
import { ButtonStyle } from "@Types_/ui.types";

@Component({
    selector: 'page-users',
    standalone: true,
    imports: [TitleHeaderComponent, ButtonComponent, InputComponent, DropdownComponent, UserListComponent],
    templateUrl: './users.page.html',
    styleUrl: './users.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPage {
    private readonly _preferenceService: PreferenceService = inject(PreferenceService);
    public preference: Signal<Preference> = computed(() => this._preferenceService.getPreference());

    public roles: Dropdown[] = [
        {
            label: "Administrador",
            value: "ADMIN_ROLE"
        },
        {
            label: "Gerente",
            value: "GERENTE_ROLE"
        },

    ]


    public buttonStyle(): ButtonStyle {
        const color = this.preference().color;
        return `rounded ${color}-ghost` as ButtonStyle;
    }
}