import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { AlertMainService } from './alert-main.service';
import { ButtonComponent } from '@Component/UI/standalone';

@Component({
  selector: 'qx-alert-main',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './alert-main.component.html',
  styleUrl: './alert-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertMainComponent {
  private readonly alertService = inject(AlertMainService);
  public alert = computed(() => this.alertService.getAlert());

  public status(): number {
    return this.alert().status;
  }

  public isType(): string {
    const status = this.status();
    if (status === 100) return 'Favor de confirmar respuesta';
    if (status === 200) return 'Tarea realizada con éxito';
    if (status === 300) return '¡Advertencia!';
    if (status === 400) return 'Error al realizar la tarea';
    if (status === 999) return 'Cargando...';
    return 'Empty';
  }

  public image(): string {
    const route = '../../../../assets/png/';
    const status = this.status();
    if (status === 100) return `${route}Question.png`;
    if (status === 200) return `${route}Success.png`
    if (status === 300) return `${route}Warning.png`;
    if (status === 400) return `${route}Error.png`;
    return ''
  }
  
  public isText(): string {
    return this.alert().message;
  }

  public hiddenAlert(): boolean {
    return this.alert().status === 0 ? false : true;
  }

  public changeStatus(): void {
    this.alertService.setAlert(0, 'Empty');
  }
}
