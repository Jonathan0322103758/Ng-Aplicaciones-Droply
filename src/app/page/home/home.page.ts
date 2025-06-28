import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PreferenceComponent } from "@Component/feature/preference/preference.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";
import { InfoComponent } from "@Component/UI/standalone";

@Component({
    selector: 'page-home',
    standalone: true,
    imports: [TitleHeaderComponent, PreferenceComponent, InfoComponent],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage { /** Solo componentes */ }