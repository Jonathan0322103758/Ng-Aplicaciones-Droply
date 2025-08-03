import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent } from '@Component/UI/standalone'; 
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";

@Component({
  selector: 'page-add-reports',
  standalone: true,
  imports: [TitleHeaderComponent,ButtonComponent],
  templateUrl: './addReports.page.html',
  styleUrl: './addReports.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReportsPage {
  public file = signal<File | null>(null);

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
