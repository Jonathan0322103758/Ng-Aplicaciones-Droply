import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TitleHeaderComponent } from "@Component/shared/title-header/title-header.component";

@Component({
    selector: 'page-permitions',
    standalone: true,
    imports: [TitleHeaderComponent],
    templateUrl: './permitions.page.html',
    styleUrl: './permitions.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermitionsPage {

}