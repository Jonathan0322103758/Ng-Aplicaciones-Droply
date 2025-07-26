import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, InputComponent, DropdownComponent, InfoComponent, SelectDateComponent, BadgeComponent } from "@Component/UI/standalone";
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from "chart.js";
import { Meter } from "@Interface/meter.interface";

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
export class MetersPage {
  public meters: Meter[] = [
    { name: "Medidor 1", serialNumber: "SN-123", type: "agua", location: "Planta baja", status: true },
    { name: "Medidor 2", serialNumber: "SN-456", type: "luz", location: "Oficina 1", status: false },
  ];

  public meterTypes = [
    { label: "Consumo", value: 1 },
    { label: "Presión", value: 2 },
    { label: "PH", value: 2 },
  ];

  public view: ViewMode = 'list';
  public selectedIndex: number | null = null;

  public meterForm: MeterForm = {
    name: "",
    serialNumber: "",
    type: "",
    location: ""
  };

  public selectedMeter(): Meter | null {
    return this.selectedIndex !== null ? this.meters[this.selectedIndex] : null;
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
      this.meterForm = { ...this.meters[this.selectedIndex] };
      this.view = 'form';
    }
  }

  public deleteMeter() {
    if (this.selectedIndex !== null) {
      this.meters.splice(this.selectedIndex, 1);
      this.showList();
    }
  }

  public saveMeter() {
    if (this.isFormValid()) {
      if (this.selectedIndex === null) {
        this.meters.push({ ...this.meterForm });
      } else {
        this.meters[this.selectedIndex] = { ...this.meterForm };
      }
      this.showList();
    }
  }

  public isFormValid() {
    return this.meterForm.name && this.meterForm.serialNumber && this.meterForm.type;
  }

  public resetForm() {
    this.meterForm = {
      name: "",
      serialNumber: "",
      type: "",
      location: ""
    };
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
