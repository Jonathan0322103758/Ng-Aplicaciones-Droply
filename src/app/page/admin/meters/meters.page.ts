import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";

@Component({
    selector: 'page-users',
    standalone: true,
    imports: [TitleHeaderComponent],
    templateUrl: './meters.page.html',
    styleUrl: './meters.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetersPage {

}