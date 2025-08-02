import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from "@angular/core";
import { AreasService } from "@Client/service/areas.service";
import { LinesService } from "@Client/service/line.service";
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
    private readonly _linesService = inject(LinesService);
    public areas$!: Observable<any>
    public lines$!: Observable<any>
    public areas = computed(() => this._areasService.get());
    public lines = computed(() => this._linesService.get());

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

    public lineForm = {
        Codigo: "",
        Area: null,
        Medidor: null,
    }

    public lineFormUpdate = {
        Id: null,
        Codigo: "",
        Area: null,
        Medidor: null,
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

    public cancelForm(): void {
        this.areaFormUpdate.Id = null;
        this.areaForm.Nombre = '';
        this.areaForm.Descripcion = '';
        this.areaFormUpdate.Nombre = '';
        this.areaFormUpdate.Descripcion = '';
        this.lineFormUpdate.Id = null;
        this.lineForm.Codigo = '';
        this.lineForm.Area = null;
        this.lineForm.Medidor = null;
        this.lineFormUpdate.Codigo = '';
        this.lineFormUpdate.Area = null;
        this.lineFormUpdate.Medidor = null;
        this.updateForm = false;
    }
    public isValidAreas(): boolean {
        const nombre = this.areaForm.Nombre ?? "";
        const descripcion = this.areaForm.Descripcion ?? "";

        return nombre.trim() !== "" && descripcion.trim() !== "" ? false : true;
    }

    public isValidLines(): boolean {
        const codigo = this.lineForm.Codigo ?? "";
        const area = this.lineForm.Area ?? "";
        const medidor = this.lineForm.Medidor ?? "";

        return codigo.trim() !== "" && area.trim() !== "" && medidor.trim() !== "" ? false : true;
    }

    public changeView(view: string): void {
        this.updateForm = false;
        this.content = view;
    }

    public setFormToUpdateArea(area: any): void {
        this.updateForm = true;
        this.areaFormUpdate.Id = area.Id;
        this.areaFormUpdate.Nombre = area.Nombre;
        this.areaFormUpdate.Descripcion = area.Descripcion;
    }

        public setFormToUpdateLine(line: any): void {
        this.updateForm = true;
        this.lineFormUpdate.Id = line.Id;
        this.lineFormUpdate.Codigo = line.Codigo;
        this.lineFormUpdate.Area = line.Area;
        this.lineFormUpdate.Medidor = line.Medidor;
    }

    /**
     * Services
     */

    public postAreas(): void {
        this._areasService.post(this.areaForm);
    }

    public putArea(): void {
        this._areasService.put(this.areaFormUpdate);
        this.updateForm = false;
    }

    public deleteArea(id: any): void {
        this._areasService.delete(id)
    }

    public postLine(): void {
        this._linesService.post(this.lineForm);
    }

    public putLine(): void {
        this._linesService.put(this.lineFormUpdate);
        this.updateForm = false;
    }

    public deleteLine(id: any): void {
        this._linesService.delete(id)
    }

    public ngOnInit(): void {
        this.areas$ = this._areasService.fetch();
        this.lines$ = this._linesService.fetch();
    }
}
