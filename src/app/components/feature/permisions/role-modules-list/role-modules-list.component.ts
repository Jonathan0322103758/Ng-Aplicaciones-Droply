import { Component, inject } from '@angular/core';
import { ModuleService } from '@Client/service/module.service';
import { ModuleCardComponent } from '../module-card/module-card.component';

@Component({
  selector: 'qx-role-modules-list',
  standalone: true,
  imports: [ModuleCardComponent],
  templateUrl: './role-modules-list.component.html',
  styleUrl: './role-modules-list.component.scss'
})
export class RoleModulesListComponent {
  private readonly _moduleService: ModuleService = inject(ModuleService);
  public dummydata = this._moduleService.dummydata()
}
