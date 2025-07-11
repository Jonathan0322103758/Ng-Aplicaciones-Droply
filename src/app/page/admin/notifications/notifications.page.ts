import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';

import { TitleHeaderComponent } from '@Component/shared/title-header/title-header.component';
import { ButtonComponent, InfoComponent } from '@Component/UI/standalone';
import { PreferenceService } from '@Client/preference/preference.service';
import { Preference } from '@Interface/ui.interface';
import { ButtonStyle } from '@Types_/ui.types';
import { InfoCardComponent } from '@Component/shared/info-card/info-card.component';
import { NotificationService } from '@Client/service/notification.service';
import { Notification } from '@Interface/notifications.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-notifications',
  standalone: true,
  imports: [
    TitleHeaderComponent,
    ButtonComponent,
    InfoComponent,
    InfoCardComponent,
    DatePipe
  ],
  templateUrl: './notifications.page.html',
  styleUrl: './notifications.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPage {
  private readonly _notificationService: NotificationService = inject(NotificationService);
  private readonly _preferenceService = inject(PreferenceService);
  public preference: Signal<Preference> = computed(() => this._preferenceService.getPreference());
  public dummyService = this._notificationService.dummydata();
  public options: boolean = false;
  public message: Notification | null = null;
  public selectedType: WritableSignal<string> = signal<string>('Nuevos Mensajes');

  public filteredNotifications(): Notification[] {
    const group = this.dummyService.find(g => g.type === this.selectedType());
    return group?.notifications ?? [];
  }

  public changeFilter(type: string): void {
    this.selectedType.set(type);
  }

  public buttonStyle(): ButtonStyle {
    const color = this.preference().color;
    return `square ${color}-ghost` as ButtonStyle;
  }

  public openLatestMessages(): void {
    console.log('Últimos mensajes abiertos');
  }

  public viewMessage(msg: Notification): void {
    this.message = msg;
  }

  public closePreview(): void {
    this.message = null;
  }

  public optionsClose(): string {
    return !this.options ? 'Ocultar opciones' : 'Ver opciones'
  }

  public toggleOptions(): void {
    this.options = !this.options;
  }
}
