
import { AsyncPipe, DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LogsService } from "@Client/service/logs.service";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, InputComponent, DropdownComponent } from "@Component/UI/standalone";
import { Dropdown } from "@Interface/ui.interface";
import { Observable } from "rxjs";

@Component({
  selector: 'page-log',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    AsyncPipe,
    TitleHeaderComponent,
    ButtonComponent,
    InputComponent,
    DropdownComponent
  ],
  templateUrl: './log.page.html',
  styleUrl: './log.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogPage implements OnInit {
  private readonly _logService = inject(LogsService);
  private _token = typeof window !== 'undefined' && window.localStorage
    ? localStorage.getItem('token')
    : null;
  private payload = this.decodePayload(this._token!)
  public logs$!: Observable<any>;
  public logs = computed(() => this._logService.get());
  public logForm = false;
  public logStatus = false;
  public logDetail = signal<any>(null)
  public typelog: Dropdown[] = [
    {
      label: "Bitácora de Mantenimiento",
      value: 2
    },
    {
      label: "Bitácora de Producción",
      value: 1
    }
  ];

  public form = {
    Titulo: '',
    Descripcion: '',
    Creado: new Date().toISOString().split('.')[0] + 'Z',
    Actualizado: new Date().toISOString().split('.')[0] + 'Z',
    Tipo: null,
    Usuario: this.payload.id
  }

  public logFormStatus(): void {
    this.logForm = !this.logForm
  }

  public detail(log: any): void {
    this.logDetail.set(log);
    this.logStatus = true;
  }

  public logDetailStatus(): void {
    this.logStatus = false;
  }

  public post(): void {
    const now = new Date().toISOString().split('.')[0] + 'Z';
    this.form.Creado = now
    this.form.Actualizado = now
    this._logService.post(this.form);
    this.logForm = false;
  }

  public deleteLog(): void {
    this._logService.delete(this.logDetail())
  }

  decodePayload(token: string): any {
    const [, payloadBase64] = token.split('.');
    return JSON.parse(atob(payloadBase64));
  }

  ngOnInit(): void {
    this.logs$ = this._logService.fetch();
  }
}