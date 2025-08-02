import { Component, computed, inject, OnInit } from '@angular/core';
import { ModuleService } from '@Client/service/module.service';
import { ModuleCardComponent } from '../module-card/module-card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'qx-role-modules-list',
  standalone: true,
  imports: [AsyncPipe, ModuleCardComponent],
  templateUrl: './role-modules-list.component.html',
  styleUrl: './role-modules-list.component.scss'
})
export class RoleModulesListComponent implements OnInit {
  private readonly _moduleService: ModuleService = inject(ModuleService);
  public modules$!: Observable<any>;

  public modules = computed(() => this._moduleService.getModulesByRole())

  public ngOnInit(): void {
      this.modules$ = this._moduleService.fetchModulesByRole();
  }
}