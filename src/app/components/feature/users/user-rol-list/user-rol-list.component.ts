import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserCardSettingsComponent } from '../user-card-settings/user-card-settings.component';
import { RolesService } from '@Client/service/roles.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'qx-user-rol-list',
  standalone: true,
  imports: [AsyncPipe, UserCardSettingsComponent],
  templateUrl: './user-rol-list.component.html',
  styleUrl: './user-rol-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRolListComponent implements OnInit {
  private readonly _roleService = inject(RolesService);
  private readonly router = inject(Router);
  public roles$!: Observable<any[]>;
  public roles = computed(() => this._roleService.getRoleUsers());

  public selectedRole = signal<string>('Administrador');

  public filterRoles(role: string): void {
    this.selectedRole.set(role);
    console.log('Selected role:', this.selectedRole());
  }
  public usersByRole = computed(() => {
    const found = this.roles().find(r => r.Role === this.selectedRole());
    return found ? found.Users : [];
  });

  ngOnInit(): void {
    this.roles$ = this._roleService.fetchUserRoles();
  }

  selectRole(role: string): void {
    this.selectedRole.set(role);
    console.log('Selected role:', this.selectedRole());
  }

}
