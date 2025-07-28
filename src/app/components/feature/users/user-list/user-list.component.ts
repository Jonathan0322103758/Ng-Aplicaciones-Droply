import { ChangeDetectionStrategy, Component, computed, inject, OnInit, output, signal, Signal } from '@angular/core';
import { TitleHeaderComponent } from '@Component/shared/title-header/title-header.component';
import { UserCardSettingsComponent } from '../user-card-settings/user-card-settings.component';
import { UserService } from '@Client/service/user.service';
import { User, Usuario } from '@Interface/user.interface';
import { FormsModule } from '@angular/forms';
import { PreferenceService } from '@Client/preference/preference.service';
import { ColorType } from '@Types_/ui.types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { InfoComponent } from '@Component/UI/standalone';

@Component({
  selector: 'qx-user-list',
  standalone: true,
  imports: [TitleHeaderComponent, UserCardSettingsComponent, FormsModule, AsyncPipe, InfoComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  private readonly _userService: UserService = inject(UserService);

  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color);
  public users$!: Observable<Usuario[]>;
  public users: Signal<Usuario[]> = computed(() => this._userService.get())
  public searchTerm = signal<string>('');

  public userSelected = output<Usuario>();

  public filteredUsers: Signal<Usuario[]> = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.users().filter(user =>
      (this.concatUsername(user).toLowerCase().includes(term) ?? false) ||
      (user.Correo?.toLowerCase().includes(term) ?? false) ||
      (user.Rol?.toLowerCase().includes(term) ?? false)
    );
  });


  public detailUser(user: Usuario): void {
    this.userSelected.emit(user);
  }

  public concatUsername(user: Usuario): string {
    return [
      user.PrimerNombre,
      user.SegundoNombre,
      user.PrimerApellido,
      user.SegundoApellido
    ]
      .filter(Boolean)
      .join(' ');
  }


  public ngOnInit(): void {
    this.users$ = this._userService.fetch();
  }
}
