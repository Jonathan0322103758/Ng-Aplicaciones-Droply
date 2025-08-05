import { ChangeDetectionStrategy, Component, computed, Signal, signal } from '@angular/core';
import { ButtonComponent } from '@Component/UI/standalone';
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from 'src/app/core/safeUrl';

@Component({
  selector: 'page-add-reports',
  standalone: true,
  imports: [SafeUrlPipe, FormsModule, DatePipe, TitleHeaderComponent, ButtonComponent],
  templateUrl: './addReports.page.html',
  styleUrl: './addReports.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReportsPage {
  public file = signal<File | null>(null);

  public reports = [
    {
      id: 1,
      name: "Consumo de Agua - Julio 2025",
      type: "pdf",
      size: "1.2 MB",
      createdAt: "2025-08-01T10:30:00Z",
      url: "https://www.buds.com.ua/images/Lorem_ipsum.pdf"
    },
    // {
    //   id: 2,
    //   name: "Reporte de Medición Semanal - Semana 30",
    //   type: "xlsx",
    //   size: "850 KB",
    //   createdAt: "2025-07-29T09:00:00Z",
    //   url: "https://file-examples.com/storage/fe3da601f55f0419b810f24/2017/02/file_example_XLSX_10.xlsx"
    // },
    {
      id: 3,
      name: "Resumen de Uso Hídrico - Trimestre 2",
      type: "pdf",
      size: "2.5 MB",
      createdAt: "2025-07-15T14:20:00Z",
      url: "https://doem.org.br/ba/modelo/arquivos/pdfviewer/0b517cdc5f9850e3782051c82e7f3234?name=lorem-ipsum.pdf"
    },
    // {
    //   id: 4,
    //   name: "Listado de Clientes Industriales Activos",
    //   type: "xlsx",
    //   size: "780 KB",
    //   createdAt: "2025-08-02T11:45:00Z",
    //   url: "https://file-examples.com/storage/fe3da601f55f0419b810f24/2017/02/file_example_XLSX_100.xlsx"
    // },
    {
      id: 5,
      name: "Informe de Pérdidas por Fugas - Junio 2025",
      type: "pdf",
      size: "1.6 MB",
      createdAt: "2025-07-10T08:50:00Z",
      url: "https://www.soundczech.cz/temp/lorem-ipsum.pdf"
    },
    // {
    //   id: 6,
    //   name: "Mediciones de Caudal - Estación Norte",
    //   type: "xlsx",
    //   size: "1.1 MB",
    //   createdAt: "2025-07-21T07:15:00Z",
    //   url: "https://file-examples.com/storage/fe3da601f55f0419b810f24/2017/02/file_example_XLSX_50.xlsx"
    // },
    {
      id: 7,
      name: "Análisis de Calidad del Agua - Julio 2025",
      type: "pdf",
      size: "1.9 MB",
      createdAt: "2025-08-03T16:10:00Z",
      url: "https://www.buds.com.ua/images/Lorem_ipsum.pdf"
    },
    // {
    //   id: 8,
    //   name: "Reporte General de Consumo - Planta Sur",
    //   type: "xlsx",
    //   size: "960 KB",
    //   createdAt: "2025-07-25T12:00:00Z",
    //   url: "https://file-examples.com/storage/fe3da601f55f0419b810f24/2017/02/file_example_XLSX_500.xlsx"
    // }
  ];


  public searchTerm = signal<string>('');

  public filteredDocs: Signal<any[]> = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.reports.filter(report =>
      Object.entries(report)
        .filter(([key, _]) => key !== 'url' && key !== 'size')
        .some(([_, value]) =>
          String(value).toLowerCase().includes(term)
        )
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

  selectedFileUrl: string | null = null;
  selectedFileType: string | null = null;

  openReport(report: any) {
    this.selectedFileUrl = report.url;
    this.selectedFileType = report.type;
  }

  closePreview() {
    this.selectedFileUrl = null;
    this.selectedFileType = null;
  }

  async downloadReport(report: any) {
    try {
      const response = await fetch(report.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = report.name;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error descargando el archivo:', error);
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
