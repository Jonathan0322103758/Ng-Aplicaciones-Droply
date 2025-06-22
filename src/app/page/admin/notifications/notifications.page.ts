import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";

@Component({
    selector: 'page-users',
    standalone: true,
    imports: [TitleHeaderComponent],
    templateUrl: './notifications.page.html',
    styleUrl: './notifications.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPage {

}