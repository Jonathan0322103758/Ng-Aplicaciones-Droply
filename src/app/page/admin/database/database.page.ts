import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from "@angular/core";
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
import { Observable } from "rxjs";
import { DatabaseService } from "./database.service";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'page-users',
    standalone: true,
    imports: [AsyncPipe, TitleHeaderComponent, ButtonComponent, InputComponent, CheckboxComponent, InfoComponent, InfoCardComponent],
    templateUrl: './database.page.html',
    styleUrl: './database.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabasePage implements OnInit {
    private readonly _database: DatabaseService = inject(DatabaseService);
    public tables$!: Observable<any>
    public backups$!: Observable<any>
    public tables = computed(() => this._database.getTables())
    public backups = computed(() => this._database.getBackups())

    /**
     * params
     */
    public username: string = '';
    public password: string = '';
    public selectedTables: string[] = [];

    public formStatus: boolean = false;
    public formType: string = '';

    public formTypeSelected(type: string): void {
        this.formType = type;
        this.formStatus = true;
    }

    public changeFormStatus(): void {
        this.formStatus = !this.formStatus;
    }

    /**
     * backup/partial
     */


    toggleTableSelection(event: Event, table: string): void {
        const input = event.target as HTMLInputElement;
        const checked = input?.checked ?? false;
        if (checked) {
            if (!this.selectedTables.includes(table)) {
                this.selectedTables.push(table);
            }
        } else {
            this.selectedTables = this.selectedTables.filter(t => t !== table);
        }
    }

    cleanForm(): void {
        this.username = '';
        this.password = '';
        this.selectedTables = [];
        this.formStatus = false;
    }


    /**
     * Services
     */

    backupByTables() {
        this._database.backupByTables({ username: this.username, password: this.password }, this.selectedTables)
    }

    ngOnInit(): void {
        this.tables$ = this._database.fetchTables();
        this.backups$ = this._database.fetchBackups();
    }
}