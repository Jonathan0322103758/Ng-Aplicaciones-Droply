import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, InputComponent, DropdownComponent, InfoComponent, SelectDateComponent } from "@Component/UI/standalone";

interface Meter {
    name: string;
    serialNumber: string;
    type: string;
    location: string;
    status?: boolean;
}
interface MeterForm extends Meter {}

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
        SelectDateComponent
    ],
    templateUrl: './meters.page.html',
    styleUrl: './meters.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetersPage {
    public meters: Meter[] = [
        { name: "Medidor 1", serialNumber: "SN-123", type: "agua", location: "Planta baja", status: true},
        { name: "Medidor 2", serialNumber: "SN-456", type: "luz", location: "Oficina 1", status: true },
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

    public buttonStyle() {
        return "rounded primary-ghost";
    }

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
}
