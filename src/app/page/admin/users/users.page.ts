import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal } from "@angular/core";
import { PreferenceService } from "@Client/preference/preference.service";
import { UserService } from "@Client/service/user.service";
import { ModuleListComponent } from "@Component/feature/permisions/module-list/module-list.component";
import { UserDetailComponent } from "@Component/feature/users/user-detail/user-detail.component";
import { UserListComponent } from "@Component/feature/users/user-list/user-list.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, DropdownComponent, InfoComponent, InputComponent } from "@Component/UI/standalone";
import { Dropdown, Preference } from "@Interface/ui.interface";
import { CreateUser, User } from "@Interface/user.interface";
import { ButtonStyle } from "@Types_/ui.types";

@Component({
    selector: 'page-users',
    standalone: true,
    imports: [
        TitleHeaderComponent,
        ButtonComponent,
        InputComponent,
        DropdownComponent,
        InfoComponent,
        UserListComponent,
        UserDetailComponent,
        ModuleListComponent
    ],
    templateUrl: './users.page.html',
    styleUrl: './users.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPage {
    private readonly _preferenceService: PreferenceService = inject(PreferenceService);
    private readonly _userService: UserService = inject(UserService);

    public formStatus: boolean = true;
    public userDetail = signal<User | null>(null);
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
        {
            label: "Auditor",
            value: "AUDITOR_ROLE"
        },
    ]

    public userForm: CreateUser = {
        firstName: '',
        middleName: '',
        lastName: '',
        secondLastName: '',
        email: '',
        employeeId: '',
        password: '1234567890',
        rol: '',
        modules: []
    }

    public buttonStyle(): ButtonStyle {
        const color = this.preference().color;
        return `rounded ${color}-ghost` as ButtonStyle;
    }

    public createUser(): void {
        this._userService.post(this.userForm);
        this.cleanForm();
    }

    public userSelected(user: User) {
        this.formStatus = false
        this.userDetail.set(user)
    }

    public cleanForm(): void {
        this.userForm = {
            firstName: '',
            middleName: '',
            lastName: '',
            secondLastName: '',
            email: '',
            employeeId: '',
            password: '1234567890',
            rol: '',
            modules: []
        };
    }

    public isFormValid(): boolean {
        const { firstName, lastName, email, rol } = this.userForm;

        return (
            (firstName ?? '').trim() !== '' &&
            (lastName ?? '').trim() !== '' &&
            (email ?? '').trim() !== '' &&
            (rol ?? '').trim() !== ''
        );
    }



    public formSelected(): void {
        this.formStatus = true
        this.userDetail.set(null)
        this.cleanForm()
    }

    private mapUserToCreateUser(user: User): CreateUser {
        const [firstName, middleName, lastName, secondLastName] = (user.name ?? '').split(' ');

        return {
            firstName: firstName ?? '',
            middleName: middleName ?? '',
            lastName: lastName ?? '',
            secondLastName: secondLastName ?? '',
            email: user.email,
            employeeId: user.number ?? '',
            password: '**********',
            rol: user.rol,
            modules: []
        };
    }


    public editUser(): void {
        this.formStatus = true;
        const user = this.userDetail();
        if (!user) return;

        this.userForm = this.mapUserToCreateUser(user);
        console.log(this.userForm)
    }
}