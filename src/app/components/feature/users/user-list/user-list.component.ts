import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { TitleHeaderComponent } from '@Component/shared/title-header/title-header.component';
import { UserCardSettingsComponent } from '../user-card-settings/user-card-settings.component';
import { UserService } from '@Client/service/user.service';
import { User } from '@Interface/user.interface';
import { FormsModule } from '@angular/forms';
import { PreferenceService } from '@Client/preference/preference.service';
import { ColorType } from '@Types_/ui.types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'qx-user-list',
  standalone: true,
  imports: [TitleHeaderComponent, UserCardSettingsComponent, FormsModule, AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  private readonly _userService: UserService = inject(UserService);

  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color);
  public dummyUsers: User[] = this._userService.getDummyUsers();
  public users$!: Observable<User[]>;
  public users: Signal<User[]> = computed(() => this._userService.get())
  public searchTerm = signal('');
  public filteredUsers = computed(() => {
  const term = this.searchTerm().toLowerCase();
  return this.users().filter(user => user.name.toLowerCase().includes(term));
});

  public ngOnInit(): void {
    this.users$ = this._userService.fetch();
  }
}
