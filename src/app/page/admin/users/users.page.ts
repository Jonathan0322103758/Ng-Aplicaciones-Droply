import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal } from "@angular/core";
import { PreferenceService } from "@Client/preference/preference.service";
import { UserService } from "@Client/service/user.service";
import { ModuleListComponent } from "@Component/feature/permisions/module-list/module-list.component";
import { UserDetailComponent } from "@Component/feature/users/user-detail/user-detail.component";
import { UserListComponent } from "@Component/feature/users/user-list/user-list.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, DropdownComponent, InfoComponent, InputComponent } from "@Component/UI/standalone";
import { Dropdown, Preference } from "@Interface/ui.interface";
import { Usuario } from "@Interface/user.interface";
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
    public userDetail = signal<Usuario | null>(null);
    public preference: Signal<Preference> = computed(() => this._preferenceService.getPreference());
        public roles: Dropdown[] = [
            {
                label: "Administrador",
                value: 2
            },
            {
                label: "Gerente",
                value: 3
            },
            {
                label: "Auditor",
                value: 4
            },
        ]

    public userForm: any = {
        // ID: this.IDaleatorio(),
        PrimerNombre: '',
        SegundoNombre: '',
        PrimerApellido: '',
        SegundoApellido: '',
        Correo: '',
        Matricula: '',
        Contrasena: '1234567890',
        Rol: null,
    }

    public buttonStyle(): ButtonStyle {
        const color = this.preference().color;
        return `square ${color}-ghost` as ButtonStyle;
    }

    public createUser(): void {
        if (this.userDetail()) {
            const body = {
                ...this.userForm,
                ID: this.userDetail()?.ID,
                Rol: Number(this.userForm.Role)
            };

            this._userService.put(body);
            this.cleanForm();
            return
        }

        const body = {
            ...this.userForm,
            Rol: Number(this.userForm.Role)
        };

        this._userService.post(body);
        this.cleanForm();
    }


    public userSelected(user: Usuario) {
        this.formStatus = false
        this.userDetail.set(user)
    }

    public cleanForm(): void {
        this.userForm = {
            // ID: this.IDaleatorio(),
            PrimerNombre: '',
            SegundoNombre: '',
            PrimerApellido: '',
            SegundoApellido: '',
            Correo: '',
            Matricula: '',
            Contrasena: '1234567890',
            Rol: null,
        };
    }

    public isFormValid(): boolean {
        const { PrimerNombre, PrimerApellido, Correo, Matricula, Role } = this.userForm;

        return (
            (PrimerNombre ?? '').trim() !== '' &&
            (PrimerApellido ?? '').trim() !== '' &&
            (Correo ?? '').trim() !== '' &&
            (Matricula ?? '').trim() !== '' &&
            (Role) !== null
        );
    }



    public formSelected(): void {
        this.formStatus = true
        this.userDetail.set(null)
        this.cleanForm()
    }

    public IDaleatorio(): number {
        return Math.floor(1000 + Math.random() * 9000);
    }

    private mapUserToCreateUser(user: any): any {
        return {
            ID: user.ID,
            PrimerNombre: user.PrimerNombre ?? '',
            SegundoNombre: user.SegundoNombre ?? '',
            PrimerApellido: user.PrimerApellido ?? '',
            SegundoApellido: user.SegundoApellido ?? '',
            Correo: user.Correo,
            Matricula: user.Matricula ?? '',
            Contrasena: '1234567890',
            Rol: user.Rol === 'Administrador' ? 2 : user.Rol === 'Gerente' ? 3 : 4,
        };
    }

    public editUser(): void {
        this.formStatus = true;
        const user = this.userDetail();
        if (!user) return;

        this.userForm = this.mapUserToCreateUser(user);
        console.log(this.userForm)
    }

    public deleteUser(): void {
        this._userService.delete(this.userDetail());
        this.userDetail.set(null)
        this.cleanForm();

    }
}