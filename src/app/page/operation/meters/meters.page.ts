import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, InputComponent, DropdownComponent, InfoComponent, SelectDateComponent, BadgeComponent } from "@Component/UI/standalone";
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from "chart.js";
import { Meter } from "@Interface/meter.interface";
import { MetersService } from "@Client/service/meters.service";
import { Observable } from "rxjs";

interface MeterForm extends Meter { }

type ViewMode = 'list' | 'detail' | 'form';

@Component({
  selector: 'page-meters',
  standalone: true,
  imports: [
    CommonModule,
    TitleHeaderComponent,
    ButtonComponent,
    InputComponent,
    DropdownComponent,
    InfoComponent,
    SelectDateComponent,
    BadgeComponent,
    NgChartsModule
  ],
  templateUrl: './meters.page.html',
  styleUrl: './meters.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetersPage implements OnInit {
  private readonly _metersService: MetersService = inject(MetersService);
  public meters$!: Observable<any>;
  public meters = computed(() => this._metersService.get());

  public fromInit = new Date(2025, 0, 1);
  public toInit = new Date();

  from: Date | null = null;
  to: Date | null = null;

  onFromChange(date: Date | null) {
    this.from = date;
  }

  onToChange(date: Date | null) {
    this.to = date;
  }

  public meterTypes = [
    { label: "Consumo", value: 1 },
    { label: "Presión", value: 2 },
    { label: "PH", value: 2 },
  ];

  public view: ViewMode = 'list';
  public selectedIndex: number | null = null;

  public meterForm: MeterForm = {
    Id: "",
    Codigo: "",
    name: "",
    serialNumber: "",
    type: "",
    location: ""
  };

  public selectedMeter(): any {
    return this.selectedIndex !== null ? this.meters()[this.selectedIndex] : null;
  }

  public showList() {
    this.view = 'list';
    this.selectedIndex = null;
  }

  public selectMeter(index: number) {
    this.selectedIndex = index;
    this.view = 'detail';
  }

  public newMeter() {
    this.resetForm();
    this.selectedIndex = null;
    this.view = 'form';
  }

  public editMeter() {
    if (this.selectedIndex !== null) {
      this.meterForm = { ...this.meters()[this.selectedIndex] };
      this.view = 'form';
    }
  }

  public deleteMeter() {

  }

  public saveMeter() {
    if (this.isFormValid()) {
      if (this.selectedIndex === null) {
        //post
      } else {
        //put
      }
      this.showList();
    }
  }

  public isFormValid() {
    return this.meterForm.name && this.meterForm.serialNumber && this.meterForm.type;
  }

  public resetForm() {
    this.meterForm = {
      Id: "",
      Codigo: "",
      name: "",
      serialNumber: "",
      type: "",
      location: ""
    };
  }

  public ngOnInit(): void {
    this.meters$ = this._metersService.fetch()
  }

  chartType: ChartType = 'line'

  chartData: ChartConfiguration['data'] = {
    labels: ['01 Jul', '02 Jul', '03 Jul', '04 Jul', '05 Jul', '06 Jul', '07 Jul'],
    datasets: [
      {
        data: [120, 135, 150, 145, 160, 155, 170],
        label: 'Litros consumidos',
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.3)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: '#2196f3'
      }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha'
        },
        ticks: { color: '#666' }
      },
      y: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Litros'
        },
        ticks: {
          color: '#666'
        }
      }
    }
  };
}
