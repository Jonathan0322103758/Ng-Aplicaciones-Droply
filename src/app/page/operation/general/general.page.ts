import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivityService } from '@Client/service/activity.service';
import { TitleHeaderComponent } from '@Component/shared/title-header/title-header.component';
import { BadgeComponent, ButtonComponent } from '@Component/UI/standalone';
import { ClassType } from '@Types_/ui.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [AsyncPipe, DatePipe, TitleHeaderComponent, ButtonComponent, BadgeComponent],
  templateUrl: './general.page.html',
  styleUrl: './general.page.scss'
})
export class Generalpage implements OnInit {
  private readonly _activityService = inject(ActivityService);
  public activity$!: Observable<any>;
  public activity = computed(() => this._activityService.get());
  public activeId = signal<number | null>(null);
  public searchTerm = signal<string>('');

  public filterActivity = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.activity().filter(activity => {
      console.log(activity)
      return (activity.Estado?.toLowerCase().includes(term) ?? false)
    }
    );
  });

  public getStatusColor(status: string): ClassType {
    switch (status.toLowerCase()) {
      case 'archivado': return 'square warning';
      case 'en pausa': return 'square info';
      case 'pendiente': return 'square secondary';
      case 'finalizado': return 'square success';
      case 'en progreso': return 'square secondary';
    }
    return 'square orange';
  }

  public setFilter(status: string): void {
    this.searchTerm.set(status)
  }

  ngOnInit(): void {
    this.activity$ = this._activityService.fetchGeneral();
  }
}
