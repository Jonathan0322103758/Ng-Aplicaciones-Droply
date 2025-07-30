import { ChangeDetectionStrategy, Component} from "@angular/core";
import { PreferenceService } from "@Client/preference/preference.service";
import { UserService } from "@Client/service/user.service";
import { ModuleListComponent } from "@Component/feature/permisions/module-list/module-list.component";
import { UserDetailComponent } from "@Component/feature/users/user-detail/user-detail.component";
import { UserListComponent } from "@Component/feature/users/user-list/user-list.component";
import { InfoCardComponent } from "@Component/shared/info-card/info-card.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, CheckboxComponent, DropdownComponent, InfoComponent, InputComponent } from "@Component/UI/standalone";
import { Dropdown, Preference } from "@Interface/ui.interface";
import { Usuario } from "@Interface/user.interface";
import { ButtonStyle } from "@Types_/ui.types";

@Component({
    selector: 'page-users',
    standalone: true,
    imports: [TitleHeaderComponent,ButtonComponent, InputComponent, CheckboxComponent, InfoComponent, InfoCardComponent],
    templateUrl: './database.page.html',
    styleUrl: './database.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabasePage {
    public formStatus: boolean = false;
    public formType: string = '';

    public formTypeSelected(type: string): void {
        this.formType = type;
        this.formStatus = true;
    }

    public changeFormStatus(): void {
        this.formStatus = !this.formStatus;
    }
}