import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { AreasService } from "@Client/service/areas.service";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, DropdownComponent, InfoComponent, InputComponent } from "@Component/UI/standalone";
import { Dropdown } from "@Interface/ui.interface";
import { Observable } from "rxjs";

@Component({
    selector: 'page-areas',
    standalone: true,
    imports: [
        TitleHeaderComponent, 
        ButtonComponent, 
        InfoComponent, 
        InputComponent, 
        DropdownComponent
    ],
    templateUrl: './areas.page.html',
    styleUrl: './areas.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreasPage {
    private readonly _areasService = inject(AreasService);
    public areas$!: Observable<any>
    public areas = computed(() => this._areasService.get());

    public optionsAreas: Dropdown[] = [
        { label: "Almacén", value: 0 },
        { label: "Producción", value: 1 },
        { label: "Calidad", value: 2 },
        { label: "Mantenimiento", value: 3 },
        { label: "Logística", value: 4 }
    ];

    public dummyAreas = [
        { _id: 0, name: 'Almacen' },
        { _id: 1, name: 'Producción'},
        { _id: 2, name: 'Calidad'},
        { _id: 3, name: 'Mantenimiento'},
        { _id: 4, name: 'Lógistica'},
    ]
}
