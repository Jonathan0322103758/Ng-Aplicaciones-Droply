import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DemoLandingComponent } from "@Component/feature/demo-landing/demo-landing.component";
import { PreferenceComponent } from "@Component/feature/preference/preference.component";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";

@Component({
    selector: 'page-home',
    standalone: true,
    imports: [TitleHeaderComponent, PreferenceComponent, DemoLandingComponent],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

}
