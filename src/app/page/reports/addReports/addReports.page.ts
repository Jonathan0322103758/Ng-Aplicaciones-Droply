import { ChangeDetectionStrategy, Component, computed, Signal, signal } from '@angular/core';
import { ButtonComponent } from '@Component/UI/standalone';
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { report } from 'process';

@Component({
  selector: 'page-add-reports',
  standalone: true,
  imports: [FormsModule, DatePipe, TitleHeaderComponent, ButtonComponent],
  templateUrl: './addReports.page.html',
  styleUrl: './addReports.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReportsPage {
  public file = signal<File | null>(null);

  public reports = [
    {
      id: 1,
      name: "Reporte de Ventas - Julio 2025",
      type: "pdf",
      size: "1.2 MB",
      createdAt: "2025-08-01T10:30:00Z",
      url: "/files/reportes/ventas-julio.pdf"
    },
    {
      id: 2,
      name: "Inventario Semanal - Semana 30",
      type: "xlsx",
      size: "850 KB",
      createdAt: "2025-07-29T09:00:00Z",
      url: "/files/reportes/inventario-semana-30.xlsx"
    },
    {
      id: 3,
      name: "Resumen Financiero - Q2",
      type: "pdf",
      size: "2.5 MB",
      createdAt: "2025-07-15T14:20:00Z",
      url: "/files/reportes/resumen-financiero-q2.pdf"
    },
    {
      id: 4,
      name: "Listado de Clientes Activos",
      type: "xlsx",
      size: "780 KB",
      createdAt: "2025-08-02T11:45:00Z",
      url: "/files/reportes/clientes-activos.xlsx"
    }
  ];
  public searchTerm = signal<string>('');

  public filteredDocs: Signal<any[]> = computed(() => {
      const term = this.searchTerm().toLowerCase();
  
      return this.reports.filter(report =>
        report.name.toLowerCase().includes(term) ?? false
      );
    });


  public handleFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedTypes = [
        'application/pdf',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];

      if (allowedTypes.includes(file.type)) {
        this.file.set(file);
        console.log('Archivo válido:', file.name);
      } else {
        alert('Solo se permiten archivos PDF, CSV o Excel.');
        input.value = '';
        this.file.set(null);
      }
    }
  }

  public subirArchivo() {
    if (this.file()) {
      console.log('Subiendo archivo:', this.file()?.name);
    } else {
      alert('Primero selecciona un archivo válido.');
    }
  }
}
