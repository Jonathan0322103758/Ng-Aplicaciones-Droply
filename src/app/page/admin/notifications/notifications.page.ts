import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleHeaderComponent } from '@Component/shared/title-header/title-header.component';
import { ButtonComponent } from '@Component/UI/standalone';
import { PreferenceService } from '@Client/preference/preference.service';
import { Preference } from '@Interface/ui.interface';
import { ButtonStyle } from '@Types_/ui.types';
import { InfoCardComponent } from '@Component/shared/info-card/info-card.component';

@Component({
  selector: 'page-notifications',
  standalone: true,
  imports: [
    TitleHeaderComponent,
    ButtonComponent,
    InfoCardComponent
  ],
  templateUrl: './notifications.page.html',
  styleUrl: './notifications.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPage {
  private readonly _preferenceService = inject(PreferenceService);
  public preference: Signal<Preference> = computed(() => this._preferenceService.getPreference());

  public messages = [
    {
      title: 'Alerta de sistema',
      concept: 'Error',
      date: new Date(),
      content: 'Falla crítica detectada en el sistema de producción.'
    },
    {
      title: 'Mantenimiento',
      concept: 'Aviso',
      date: new Date(),
      content: 'El sistema estará en mantenimiento esta noche.'
    }
  ];

  public selectedMessage: any = null;

  public buttonStyle(): ButtonStyle {
    const color = this.preference().color;
    return `rounded ${color}-ghost` as ButtonStyle;
  }

  public openLatestMessages(): void {
    console.log('Últimos mensajes abiertos');
  }

  public sendMessage(): void {
    console.log('Mensaje enviado');
  }

  public remindLater(): void {
    console.log('Recordar más tarde');
  }

  public openArchived(): void {
    console.log('Abrir archivados');
  }

  public openTrash(): void {
    console.log('Abrir papelera');
  }

  public snooze(msg: any): void {
    console.log('Posponer', msg);
  }

  public archive(msg: any): void {
    console.log('Archivar', msg);
  }

  public view(msg: any): void {
    this.selectedMessage = msg;
  }

  public delete(msg: any): void {
    console.log('Eliminar', msg);
  }

  public closePreview(): void {
    this.selectedMessage = null;
  }
}
