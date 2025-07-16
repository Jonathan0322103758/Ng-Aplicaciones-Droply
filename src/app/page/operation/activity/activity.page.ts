import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivityCardComponent } from "@Component/shared/activity-card/activity-card.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";

@Component({
    selector: 'page-home',
    standalone: true,
    imports: [TitleHeaderComponent, ActivityCardComponent],
    templateUrl: './activity.page.html',
    styleUrl: './activity.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityPage {
  columns = [
    {
      title: 'En pausa',
      tasks: [
        {
          id: 'task-001',
          title: 'Investigar API',
          fromTo: '10 Jul - 12 Jul',
          summary: 'Explorar documentación de la API externa para futuras integraciones.',
          assignedTo: 'Jonathan M.'
        },
        {
          id: 'task-002',
          title: 'Revisar diseño',
          fromTo: '13 Jul - 14 Jul',
          summary: 'Verificar coherencia visual del diseño en Figma.',
          assignedTo: 'Paola R.'
        }
      ]
    },
    {
      title: 'En progreso',
      tasks: [
        {
          id: 'task-003',
          title: 'Desarrollar componente',
          fromTo: '14 Jul - 17 Jul',
          summary: 'Crear componente de vista Kanban para actividades.',
          assignedTo: 'Carlos H.'
        },
        {
          id: 'task-004',
          title: 'Conectar base de datos',
          fromTo: '15 Jul - 18 Jul',
          summary: 'Integrar servicios con Firestore y probar queries.',
          assignedTo: 'Ana L.'
        }
      ]
    },
    {
      title: 'Terminado',
      tasks: [
        {
          id: 'task-005',
          title: 'Diseño inicial',
          fromTo: '01 Jul - 03 Jul',
          summary: 'Diseño inicial de pantallas en prototipo.',
          assignedTo: 'Laura S.'
        },
        {
          id: 'task-006',
          title: 'Documentación',
          fromTo: '05 Jul - 06 Jul',
          summary: 'Generar documentación básica de la estructura del proyecto.',
          assignedTo: 'Marcos F.'
        }
      ]
    },
    {
      title: 'Archivado',
      tasks: [
        {
          id: 'task-007',
          title: 'Prototipo obsoleto',
          fromTo: 'Junio',
          summary: 'Versión inicial descartada por cambios en requerimientos.',
          assignedTo: 'Equipo UX'
        }
      ]
    }
  ];

  public getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'en pausa':
      return 'warning';
    case 'en progreso':
      return 'info';
    case 'terminado':
      return 'success';
    case 'archivado':
      return 'muted';
    default:
      return 'neutral';
  }
}

}

