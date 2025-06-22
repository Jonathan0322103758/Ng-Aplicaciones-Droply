import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PreferenceComponent } from "@Component/feature/preference/preference.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { DropdownComponent } from "@Component/UI/dropdown/dropdown.component";
import { InputComponent } from "@Component/UI/standalone";

@Component({
    selector: 'page-home',
    standalone: true,
    imports: [TitleHeaderComponent, PreferenceComponent, DropdownComponent, InputComponent],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
    public option = [
        {
            label: 'si',
            value: true
        },
        {
            label: 'no',
            value: false
        }
    ]
}