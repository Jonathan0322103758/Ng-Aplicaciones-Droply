import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { ActivityCardComponent } from "@Component/shared/activity-card/activity-card.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AsyncPipe, CommonModule } from "@angular/common";
import { ButtonComponent, InputComponent, SelectDateComponent } from "@Component/UI/standalone";
import { ActivityService } from "@Client/service/activity.service";
import { Observable } from "rxjs";
@Component({
  selector: 'page-activity',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleHeaderComponent,
    ActivityCardComponent,
    ButtonComponent,
    InputComponent,
    CommonModule,
    DragDropModule,
    SelectDateComponent
  ],
  templateUrl: './activity.page.html',
  styleUrl: './activity.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPage {
  private readonly _activityService = inject(ActivityService);
  public activity$!: Observable<any>;
  public activity = computed(() => this._activityService.get())
  public formOpen: { [columnId: number]: boolean } = {};
  public newTasks: { [columnId: number]: { title: string; summary: string } } = {};

  private estadoMap: Record<string, number> = {
    'Archivado': 6,
    'En Pausa': 5,
    'Finalizado': 2,
    'En Progreso': 1
  };

  public formPost = {
    Titulo: '',
    Descripcion: '',
    FechaInicio: new Date().toISOString().split('.')[0] + 'Z',
    FechaFin: new Date(),
    Tipo: 1,
    Estado: null
  }

  public dropListIds = computed(() =>
    this.activity().map((_, i) => `column-drop-${i}`)
  );

  constructor() {
    this.activity().forEach(col => {
      this.formOpen[col._id] = false;
      this.newTasks[col._id] = { title: '', summary: '' };
    });
  }

  public toggleForm(columnId: number): void {
    Object.keys(this.formOpen).forEach(id => {
      this.formOpen[+id] = false;
    });

    this.formOpen[columnId] = true;
  }


  public cancelForm(): void {
    Object.keys(this.formOpen).forEach(id => {
      this.formOpen[+id] = false;
    });
  }

  public drop(event: CdkDragDrop<any[]>, column: any): void {
    const allColumns = this.activity();

    if (event.previousContainer === event.container) {
      moveItemInArray(column.Actividades, event.previousIndex, event.currentIndex);
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex];

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );


      const estadoId = this.estadoMap[column.Estado];

      if (estadoId && movedTask?.Id) {
        const now = new Date().toISOString();

        const dataToUpdate = {
          ...movedTask,
          Estado: estadoId,
          Actualizado: now
        };

        delete dataToUpdate.Tipo;
        delete dataToUpdate.Creacion;
        console.log(dataToUpdate)
        this._activityService.put(dataToUpdate);
      }
    }

    this._activityService.setActivity(allColumns);
  }

  public guardarActividad(nombreEstado: string): void {
    const estadoId = this.estadoMap[nombreEstado];
    const now = new Date().toISOString().split('.')[0] + 'Z';

    const actividad = {
      ...this.formPost,
      Estado: estadoId,
      FechaInicio: now,
      FechaFin: now,
      Actualizado: now
    };

    this._activityService.post(actividad);

    // Reset form y cerrar panel
    this.formPost.Titulo = '';
    this.formPost.Descripcion = '';
    this.cancelForm();
  }




  public getFromTo(startDate: string, endDate: string): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };
    const start = new Date(startDate).toLocaleDateString('es-MX', options);
    const end = new Date(endDate).toLocaleDateString('es-MX', options);
    return `${start} - ${end}`;
  }

  public getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'archivado': return 'warning';
      case 'en pausa': return 'info';
      case 'pendiente': return 'secondary';
      case 'finalizado': return 'success';
      case 'en progreso': return 'secondary';
    }
    return 'neutral';
  }


  ngOnInit() {
    this.activity$ = this._activityService.fetch()
  }

}

