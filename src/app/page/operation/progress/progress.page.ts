// general-operation-pregress
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal } from "@angular/core";
import { PreferenceService } from "@Client/preference/preference.service";
import { ActivityService } from "@Client/service/activity.service";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, InfoComponent, SelectDateComponent } from "@Component/UI/standalone";
import { ButtonStyle, ColorType } from "@Types_/ui.types";
import { Observable } from "rxjs";

@Component({
  selector: 'page-progress',
  standalone: true,
  imports: [AsyncPipe, TitleHeaderComponent, SelectDateComponent, ButtonComponent, InfoComponent],
  templateUrl: './progress.page.html',
  styleUrl: './progress.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressPage {
  private readonly _progressService: ActivityService = inject(ActivityService);
  private readonly _preferenceService: PreferenceService = inject(PreferenceService);
  public accentColor: Signal<ColorType> = computed(() => this._preferenceService.getPreference().color)


  public progress$!: Observable<any>;
  public progress = computed(() => this._progressService.getProgress())
  public from = signal(new Date("2025-01-02"));
  public to = signal(new Date());

  public sendDate(): void {
    const from = this.from().toISOString().split('T')[0];
    const to = this.to().toISOString().split('T')[0];

    const params: {
      FechaInicio: [string, string];
      FechaFin: [string, string];
    } = {
      FechaInicio: [">=", from],
      FechaFin: ["<=", to]
    };


    this.progress$ = this._progressService.fetchProgres(params);
  }



  public getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'archivado': return 'warning';
      case 'en pausa': return 'info';
      case 'en progreso': return 'secondary';
      case 'pendiente': return 'secondary';
      case 'terminado': return 'success';
      case 'finalizado': return 'success';
    }
    return 'neutral';
  }

  public totalProgress(): number {
    return this.progress().reduce((total, item) => {
      return total + (item.Actividades?.length || 0);
    }, 0);
  }

  public buttonStyle(): ButtonStyle {
    return `square ${this.accentColor()}-ghost` as ButtonStyle;
  }

  public ngOnInit() {
    this.progress$ = this._progressService.fetchProgres();
  }
}
