import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from "@angular/core";
import { LecService } from "@Client/service/lec.service";
import { LinesService } from "@Client/service/line.service";
import { DemoLandingComponent } from "@Component/feature/demo-landing/demo-landing.component";
import { PreferenceComponent } from "@Component/feature/preference/preference.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { BadgeComponent, ButtonComponent, InfoComponent, SelectDateComponent } from "@Component/UI/standalone";
import { ChartConfiguration, ChartType } from "chart.js";
import { NgChartsModule } from "ng2-charts";
import { Observable } from "rxjs";
import 'chartjs-adapter-date-fns';


@Component({
    selector: 'page-home',
    standalone: true,
    imports: [
        AsyncPipe,
        TitleHeaderComponent,
        PreferenceComponent,
        DemoLandingComponent,
        NgChartsModule,
        InfoComponent,
        BadgeComponent,
        ButtonComponent
    ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
    private readonly _lineService = inject(LinesService);
    private readonly _lecService = inject(LecService);
    public lines$!: Observable<any>;
    public lec$!: Observable<any>;
    public lecMes$!: Observable<any>;
    public lines = computed(() => this._lineService.get());
    public lec = computed(() => this._lecService.get());
    public lecMes = computed(() => this._lecService.getMes());

    chartType: ChartType = 'line'

    litros = [120, 135, 150, 145, 160, 155, 170];

    chartDataByLitros(data: number[], fechas: string[]): ChartConfiguration['data'] {
        const borderColor = data.map(value => this.getColorByLiters(value));
        const backgroundColor = borderColor.map(color => color + '40');

        return {
            labels: fechas,
            datasets: [
                {
                    data,
                    label: 'Litros consumidos',
                    borderColor,
                    backgroundColor,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: borderColor,
                }
            ]
        };
    }

    calcularRef(): void {
        window.open('http://10.102.221.79:5500/calculo.html', '_blank');
    }

    chartData: ChartConfiguration['data'] = {
        labels: ['01 Jul', '02 Jul', '03 Jul', '04 Jul', '05 Jul', '06 Jul', '07 Jul'],
        datasets: [
            {
                data: this.litros,
                label: 'Litros consumidos',
                borderColor: this.litros.map(value => this.getColorByLiters(value)),
                backgroundColor: this.litros.map(value => this.getColorByLiters(value) + '40'),
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: this.litros.map(value => this.getColorByLiters(value)),
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

    getColorByLiters(value: number): string {
        if (value > 170) return '#DC3545';
        if (value > 150) return '#FF642B';
        if (value > 130) return '#F5BB49';
        return '#2196f3';
    }

    getLecturasByMedidor(): any[] {
        const lineas = this.lines();
        const lecturas = this.lec();

        const lineasConLecturas = lineas.map(linea => {
            const lecturasFiltradas = lecturas.filter(lec => lec.Medidor === linea.Medidor.Id);

            return {
                ...linea,
                Medidor: {
                    ...linea.Medidor,
                    lecturas: lecturasFiltradas.map(l => l.Valor),
                    fechas: lecturasFiltradas.map(l =>
                        new Date(l.FechaRegistro).toLocaleDateString('es-MX', {
                            day: '2-digit',
                            month: 'short'
                        })
                    )

                }
            };
        });

        console.log(lineasConLecturas);
        return lineasConLecturas;
    }

    getConsumoPorMes(): { [mes: string]: number } {
        const lecturas = this.lecMes(); // Asegúrate que devuelve un array
        const consumoPorMes: { [mes: string]: number } = {};

        // Obtener año actual o el año deseado (puedes parametrizar)
        const currentYear = new Date().getFullYear();

        // Generar claves para los 12 meses (ejemplo: "enero 2025")
        const meses = Array.from({ length: 12 }, (_, i) => {
            const date = new Date(currentYear, i, 1);
            return date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
        });

        // Inicializar todos los meses con 0
        meses.forEach(mes => consumoPorMes[mes] = 0);

        // Sumar valores por mes
        lecturas.forEach(lectura => {
            const fecha = new Date(lectura.FechaRegistro);
            const mesClave = fecha.toLocaleDateString('es-MX', {
                month: 'long',
                year: 'numeric'
            });

            if (consumoPorMes.hasOwnProperty(mesClave)) {
                consumoPorMes[mesClave] += lectura.Valor;
            }
        });

        return consumoPorMes;
    }



    getChartDataPorMes(): ChartConfiguration['data'] {
        const consumo = this.getConsumoPorMes();
        const labels = Object.keys(consumo);
        const data = Object.values(consumo);
        const borderColor = data.map(value => this.getColorByLiters(value));
        const backgroundColor = borderColor.map(color => color + '40');

        return {
            labels,
            datasets: [
                {
                    data,
                    label: 'Consumo por mes',
                    borderColor,
                    backgroundColor,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: borderColor
                }
            ]
        };
    }

    from = signal<Date>(new Date());
to = signal<Date>(new Date());

get fromString(): string {
  return this.from().toISOString().split('T')[0];
}

get toString(): string {
  return this.to().toISOString().split('T')[0];
}

onFromChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target.value) {
    this.from.set(new Date(target.value));
  }
}

onToChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target.value) {
    this.to.set(new Date(target.value));
  }
}

consultarPeriodo(): void {
  const fromStr = this.fromString;
  const toStr = this.toString;
  this.lecMes$ = this._lecService.fetchByMes(fromStr, toStr);
}



    ngOnInit(): void {
        this.lines$ = this._lineService.fetch();
        this.lec$ = this._lecService.fetchByPeriodo();
        this.lecMes$ = this._lecService.fetchByMes()
    }
}
