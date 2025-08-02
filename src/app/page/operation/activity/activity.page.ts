import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivityCardComponent } from "@Component/shared/activity-card/activity-card.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from "@angular/common";
import { ButtonComponent, InputComponent, SelectDateComponent } from "@Component/UI/standalone";
@Component({
  selector: 'page-activity',
  standalone: true,
  imports: [TitleHeaderComponent, ActivityCardComponent, ButtonComponent, InputComponent, CommonModule, DragDropModule, SelectDateComponent],
  templateUrl: './activity.page.html',
  styleUrl: './activity.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPage {
  public formOpen: { [columnId: number]: boolean } = {};
  public newTasks: { [columnId: number]: { title: string; summary: string } } = {};
  public columns = [
    {
      _id: 0,
      status: 'Archivado',
      tasks: [
        {
          _id: 'task-007',
          title: 'Prototipo obsoleto',
          from: '2024-06-01',
          to: '2024-06-30',
          summary: 'Versión inicial descartada por cambios en requerimientos.',
        }
      ]
    },
    {
      _id: 1,
      status: 'En pausa',
      tasks: [
        {
          _id: 'task-001',
          title: 'Investigar API',
          from: '2024-07-10',
          to: '2024-07-12',
          summary: 'Explorar documentación de la API externa para futuras integraciones.',
        },
        {
          _id: 'task-002',
          title: 'Revisar diseño',
          from: '2024-07-13',
          to: '2024-07-14',
          summary: 'Verificar coherencia visual del diseño en Figma.',
        }
      ]
    },
    {
      _id: 2,
      status: 'En progreso',
      tasks: [
        {
          _id: 'task-003',
          title: 'Desarrollar componente',
          from: '2024-07-14',
          to: '2024-07-17',
          summary: 'Crear componente de vista Kanban para actividades.',
        },
        {
          _id: 'task-004',
          title: 'Conectar base de datos',
          from: '2024-07-15',
          to: '2024-07-18',
          summary: 'Integrar servicios con Firestore y probar queries.',
        }
      ]
    },
    {
      _id: 3,
      status: 'Terminado',
      tasks: [
        {
          _id: 'task-005',
          title: 'Diseño inicial',
          from: '2024-07-01',
          to: '2025-07-18T00:00:00.000Z',
          summary: 'Diseño inicial de pantallas en prototipo.',
        },
        {
          _id: 'task-006',
          title: 'Documentación',
          from: '2024-07-05',
          to: '2024-07-06',
          summary: 'Generar documentación básica de la estructura del proyecto.',
        }
      ]
    }
  ];

  public dropListIds = this.columns.map((_, i) => `column-drop-${i}`);

  constructor() {
    this.columns.forEach(col => {
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

  public drop(event: CdkDragDrop<any[]>, column: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(column.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        column.tasks,
        event.previousIndex,
        event.currentIndex
      );
    }
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
      case 'en progreso': return 'secondary';
      case 'terminado': return 'success';
    }
    return 'neutral';
  }

}

