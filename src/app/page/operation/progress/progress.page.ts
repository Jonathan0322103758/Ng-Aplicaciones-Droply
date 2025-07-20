// general-operation-pregress
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { SelectDateComponent } from "@Component/UI/standalone";

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [TitleHeaderComponent, SelectDateComponent],
  templateUrl: './progress.page.html',
  styleUrl: './progress.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressPage {
  public dateValue: string = ''
  public progress = {
    total: 15,
    tasks: [
      {
        _id: 0,
        status: 'Archivado',
        tasks: [
          {
            _id: 'task-007',
            from: '2024-06-01',
            to: '2024-06-30',
            assignedTo: 'Equipo UX'
          },
          {
            _id: 'task-015',
            from: '2024-05-01',
            to: '2024-05-15',
            assignedTo: 'Mario R.'
          }
        ]
      },
      {
        _id: 1,
        status: 'En pausa',
        tasks: [
          {
            _id: 'task-001',
            from: '2024-07-10',
            to: '2024-07-12',
            assignedTo: 'Jonathan M.'
          },
          {
            _id: 'task-002',
            from: '2024-07-13',
            to: '2024-07-14',
            assignedTo: 'Paola R.'
          },
          {
            _id: 'task-016',
            from: '2024-07-25',
            to: '2024-07-26',
            assignedTo: 'David L.'
          }
        ]
      },
      {
        _id: 2,
        status: 'En progreso',
        tasks: [
          {
            _id: 'task-003',
            from: '2024-07-14',
            to: '2024-07-17',
            assignedTo: 'Carlos H.'
          },
          {
            _id: 'task-004',
            from: '2024-07-15',
            to: '2024-07-18',
            assignedTo: 'Ana L.'
          },
          {
            _id: 'task-004',
            from: '2024-07-15',
            to: '2024-07-18',
            assignedTo: 'Ana L.'
          },
          {
            _id: 'task-004',
            from: '2024-07-15',
            to: '2024-07-18',
            assignedTo: 'Ana L.'
          },
          {
            _id: 'task-017',
            from: '2024-07-19',
            to: '2024-07-21',
            assignedTo: 'Luis T.'
          }
        ]
      },
      {
        _id: 3,
        status: 'Terminado',
        tasks: [
          {
            _id: 'task-005',
            from: '2024-07-01',
            to: '2025-07-18',
            assignedTo: 'Laura S.'
          },
          {
            _id: 'task-005',
            from: '2024-07-01',
            to: '2025-07-18',
            assignedTo: 'Laura S.'
          },
          {
            _id: 'task-006',
            from: '2024-07-05',
            to: '2024-07-06',
            assignedTo: 'Marcos F.'
          },
          {
            _id: 'task-018',
            from: '2024-07-07',
            to: '2024-07-10',
            assignedTo: 'Beatriz G.'
          }
        ]
      },
      {
        _id: 4,
        status: 'Asignado',
        tasks: [
          {
            _id: 'task-019',
            from: '2024-07-22',
            to: '2024-07-25',
            assignedTo: 'Rafael Z.'
          },
          {
            _id: 'task-020',
            from: '2024-07-26',
            to: '2024-07-28',
            assignedTo: 'Lucía D.'
          }
        ]
      }
    ]
  };



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
