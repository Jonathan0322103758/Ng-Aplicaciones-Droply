import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";

@Component({
    selector: 'page-users',
    standalone: true,
    imports: [TitleHeaderComponent],
    templateUrl: './alerts.page.html',
    styleUrl: './alerts.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsPage {

}