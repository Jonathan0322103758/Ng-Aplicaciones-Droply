import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from "@angular/core";
import { AreasService } from "@Client/service/areas.service";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { ButtonComponent, DropdownComponent, InfoComponent, InputComponent } from "@Component/UI/standalone";
import { Dropdown } from "@Interface/ui.interface";
import { Observable } from "rxjs";

@Component({
    selector: 'page-areas',
    standalone: true,
    imports: [
        AsyncPipe,
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
export class AreasPage implements OnInit {
    private readonly _areasService = inject(AreasService);
    public areas$!: Observable<any>
    public areas = computed(() => this._areasService.get());

    public content: string = 'areas'

    public areaForm = {
        Nombre: "",
        Descripcion: "",
    }

    public areaFormUpdate = {
        Id: null,
        Nombre: "",
        Descripcion: "",
    }

    public updateForm = false;
 
    public optionsAreasList: Dropdown[] = [];

    public optionsAreas = computed(() => {
        const areas = this._areasService.get() || [];
        return areas.map(area => ({
            label: area.Nombre,
            value: area.Id,
        }));
    });


    constructor() {
        effect(() => {
            this.optionsAreasList = this.optionsAreas();
        });
    }

    public cancelAreasForm(): void {
        this.areaForm.Nombre = '';
        this.areaForm.Descripcion = '';
    }
    public isValidAreas(): boolean {
        const nombre = this.areaForm.Nombre ?? "";
        const descripcion = this.areaForm.Descripcion ?? "";

        return nombre.trim() !== "" && descripcion.trim() !== "" ? false : true;
    }

    public changeView(view: string): void {
        this.content = view;
    }

    public setFormToUpdateArea(area: any): void {
        this.updateForm = true;
        this.areaFormUpdate.Id = area.Id;
        this.areaFormUpdate.Nombre = area.Nombre;
        this.areaFormUpdate.Descripcion = area.Descripcion;
    }

    /**
     * Services
     */

    public postAreas(): void {
        this._areasService.post(this.areaForm);
    }

    public put(): void {
        this._areasService.put(this.areaFormUpdate);
        this.updateForm = false;
    }

    public deleteArea(id: any): void {
        this._areasService.delete(id)
    }

    public ngOnInit(): void {
        this.areas$ = this._areasService.fetch();
    }
}
