
import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { PreferenceService } from "@Client/preference/preference.service";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, InputComponent, DropdownComponent } from "@Component/UI/standalone";

@Component({
  selector: 'page-log',
  standalone: true,
  imports: [
    TitleHeaderComponent,
    ButtonComponent,
    InputComponent,
    DropdownComponent
  ],
  templateUrl: './log.page.html',
  styleUrl: './log.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogPage {
  private readonly preferenceService = inject(PreferenceService);
  public preference = computed(() => this.preferenceService.getPreference());

  public formStatus = signal(true);
  public bitacoraDetail = signal<any | null>(null);
  public bitacoras = signal<any[]>([]);

  public bitacoraForm = {
    titulo: '',
    descripcion: '',
    tipo: '',
    usuario: ''
  };

  public tipos = [
    { label: 'Auditoría', value: 'auditoria' },
    { label: 'Producción', value: 'produccion' },
    { label: 'Calidad', value: 'calidad' }
  ];

  public usuarios = [
    { label: 'Andrea', value: 'andrea' },
    { label: 'Raúl', value: 'raul' },
    { label: 'Marlon', value: 'marlon' }
  ];

  public buttonStyle(): string {
    return `rounded ${this.preference().color}-ghost`;
  }

  public formSelected(): void {
    this.formStatus.set(true);
    this.bitacoraDetail.set(null);
    this.cleanForm();
  }

  public bitacoraSelected(b: any): void {
    this.formStatus.set(false);
    this.bitacoraDetail.set(b);
  }

  public editBitacora(b: any): void {
    this.bitacoraDetail.set(b);
    this.bitacoraForm = {
      titulo: b.titulo,
      descripcion: b.descripcion,
      tipo: b.tipo,
      usuario: b.usuario
    };
    this.formStatus.set(true);
  }

  public deleteBitacora(b: any): void {
    this.bitacoras.set(this.bitacoras().filter(x => x !== b));
    this.bitacoraDetail.set(null);
  }

  public saveBitacora(): void {
    const editing = this.bitacoraDetail();
    if (editing) {
      this.bitacoras.set(
        this.bitacoras().map(x => x === editing ? { ...editing, ...this.bitacoraForm } : x)
      );
    } else {
      const nueva = {
        id: Date.now(),
        ...this.bitacoraForm
      };
      this.bitacoras.set([...this.bitacoras(), nueva]);
    }
    this.cleanForm();
  }

  public cleanForm(): void {
    this.bitacoraForm = {
      titulo: '',
      descripcion: '',
      tipo: '',
      usuario: ''
    };
    this.formStatus.set(true);
  }

  public isFormValid(): string {
    const f = this.bitacoraForm;
    return f.titulo.trim() && f.descripcion.trim() && f.tipo.trim() && f.usuario.trim();
  }
}