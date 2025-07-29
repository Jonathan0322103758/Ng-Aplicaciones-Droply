import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { UserCardSettingsComponent } from '../user-card-settings/user-card-settings.component';
import { RolesService } from '@Client/service/roles.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'qx-user-rol-list',
  standalone: true,
  imports: [AsyncPipe, UserCardSettingsComponent],
  templateUrl: './user-rol-list.component.html',
  styleUrl: './user-rol-list.component.scss'
})
export class UserRolListComponent implements OnInit {
  private readonly _roleService = inject(RolesService);
  public roles$!: Observable<any>;
  public roles = computed(() => this._roleService.getRoleUsers());

  ngOnInit(): void {
    this.roles$ = this._roleService.fetch();    
  }
}
