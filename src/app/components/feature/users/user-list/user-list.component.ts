import { Component, computed, inject, Signal } from '@angular/core';
import { TitleHeaderComponent } from '@Component/shared/title-header/title-header.component';
import { UserCardSettingsComponent } from '../user-card-settings/user-card-settings.component';
import { UserService } from '@Client/service/user.service';
import { User } from '@Interface/user.interface';
import { FormsModule } from '@angular/forms';
import { PreferenceService } from '@Client/preference/preference.service';
import { ColorType } from '@Types_/ui.types';

@Component({
  selector: 'qx-user-list',
  standalone: true,
  imports: [TitleHeaderComponent, UserCardSettingsComponent, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  private readonly _userService: UserService = inject(UserService);
  
  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color);
  public dummyUsers: User[] = this._userService.getDummyUsers();
  public searchTerm: string = '';
  public filteredUsers: User[] = [...this.dummyUsers];

  public searchUser(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.dummyUsers.filter((user) => {
      return user.name.toLowerCase().includes(term);
    })
  }
}
