import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { ModuleService } from '@Client/service/module.service';
import { ModuleListComponent } from '@Component/feature/permisions/module-list/module-list.component';
import { TitleHeaderComponent } from '@Component/shared/title-header/title-header.component';
import { Module } from '@Interface/module.interface';
import { User, Usuario } from '@Interface/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'qx-user-detail',
  standalone: true,
  imports: [TitleHeaderComponent, ModuleListComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent {
  public user = input.required<Usuario | null>();

  private readonly _moduleService: ModuleService = inject(ModuleService);
  // public modules$!: Observable<Module[]>
  // public modules: Signal<Module[]> = computed(() => this._moduleService.get());

  // public userStatus(): string {
  //   return this.user()?.status === true ? 'Activo' : 'Baja'
  // }

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

  // ngOnInit(): void {
  //   this.modules$ = this._moduleService.fetch()
  // }

}
