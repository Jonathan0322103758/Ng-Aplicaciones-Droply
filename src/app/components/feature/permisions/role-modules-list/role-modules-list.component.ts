import { Component, computed, inject, OnInit } from '@angular/core';
import { ModuleService } from '@Client/service/module.service';
import { ModuleCardComponent } from '../module-card/module-card.component';
import { Observable } from 'rxjs';
import { Module } from '@Interface/module.interface';

@Component({
  selector: 'qx-role-modules-list',
  standalone: true,
  imports: [ModuleCardComponent],
  templateUrl: './role-modules-list.component.html',
  styleUrl: './role-modules-list.component.scss'
})
export class RoleModulesListComponent implements OnInit {
  private readonly _moduleService: ModuleService = inject(ModuleService);
  public modules$!: Observable<Module[]>;

  public modules = computed(() => this._moduleService.get())

  public ngOnInit(): void {
      this.modules$ = this._moduleService.fetch();
  }
  // public dummydata = this._moduleService.dummydata()
}
