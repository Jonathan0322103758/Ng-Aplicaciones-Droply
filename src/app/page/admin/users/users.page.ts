import { ChangeDetectionStrategy, Component, computed, inject, Signal } from "@angular/core";
import { PreferenceService } from "@Client/preference/preference.service";
import { UserListComponent } from "@Component/feature/users/user-list/user-list.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent } from "@Component/UI/button/button.component";
import { Preference } from "@Interface/ui.interface";
import { ButtonStyle, ColorType } from "@Types_/ui.types";

@Component({
    selector: 'page-users',
    standalone: true,
    imports: [TitleHeaderComponent, ButtonComponent, UserListComponent],
    templateUrl: './users.page.html',
    styleUrl: './users.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPage {
    private readonly _preferenceService: PreferenceService = inject(PreferenceService);
    public preference: Signal<Preference> = computed(() => this._preferenceService.getPreference());


    public buttonStyle(): ButtonStyle {
        const color = this.preference().color;
        return `rounded ${color}-ghost` as ButtonStyle;
    }
}