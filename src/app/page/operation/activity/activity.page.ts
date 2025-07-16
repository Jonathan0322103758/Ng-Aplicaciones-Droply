import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivityCardComponent } from "@Component/shared/activity-card/activity-card.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [TitleHeaderComponent, ActivityCardComponent,],
  templateUrl: './activity.page.html',
  styleUrl: './activity.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPage {
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
          assignedTo: 'Equipo UX'
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
          assignedTo: 'Jonathan M.'
        },
        {
          _id: 'task-002',
          title: 'Revisar diseño',
          from: '2024-07-13',
          to: '2024-07-14',
          summary: 'Verificar coherencia visual del diseño en Figma.',
          assignedTo: 'Paola R.'
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
          assignedTo: 'Carlos H.'
        },
        {
          _id: 'task-004',
          title: 'Conectar base de datos',
          from: '2024-07-15',
          to: '2024-07-18',
          summary: 'Integrar servicios con Firestore y probar queries.',
          assignedTo: 'Ana L.'
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
          to: '2024-07-03',
          summary: 'Diseño inicial de pantallas en prototipo.',
          assignedTo: 'Laura S.'
        },
        {
          _id: 'task-006',
          title: 'Documentación',
          from: '2024-07-05',
          to: '2024-07-06',
          summary: 'Generar documentación básica de la estructura del proyecto.',
          assignedTo: 'Marcos F.'
        }
      ]
    }
  ];

  public getFromTo(startDate: string, endDate: string): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
    const start = new Date(startDate).toLocaleDateString('es-MX', options);
    const end = new Date(endDate).toLocaleDateString('es-MX', options);
    return `${start} - ${end}`;
  }



  public getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'en pausa':
        return 'primary';
      case 'en progreso':
        return 'info';
      case 'terminado':
        return 'success';
      case 'archivado':
        return 'warning';
      default:
        return 'neutral';
    }
  }

}

