import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { PreferenceService } from '@Client/preference/preference.service';
import { ModuleService } from '@Client/service/module.service';
import { BadgeComponent, ButtonComponent, InfoComponent } from '@Component/UI/standalone';
import { Module } from '@Interface/module.interface';
import { ButtonStyle, ColorType } from '@Types_/ui.types';
import { Observable } from 'rxjs';
import { ModuleCardComponent } from '../module-card/module-card.component';

@Component({
  selector: 'qx-module-list',
  standalone: true,
  imports: [ModuleCardComponent, InfoComponent, AsyncPipe],
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleListComponent implements OnInit {
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  private readonly _moduleService: ModuleService = inject(ModuleService);

  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color)
  public modules$!: Observable<Module[]>
  public modules: Signal<Module[]> = computed(() => this._moduleService.get());

  selectedModules: any[] = [];

  sendModules(module: any, checked: boolean): void {
    module.status = checked;

    if (checked) {
      if (!this.selectedModules.includes(module)) {
        this.selectedModules.push(module);
      }
    } else {
      this.selectedModules = this.selectedModules.filter(m => m !== module);
    }
  }

  public buttonStyle(): ButtonStyle {
    const color = this.accentColor();
    return `rounded ${color}-ghost` as ButtonStyle;
  }

  public ngOnInit(): void {
    this.modules$ = this._moduleService.fetch()
  }

}
