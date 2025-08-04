import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonComponent } from "@Component/UI/standalone";

@Component({
    selector: 'page-not-found',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './not-found.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPage {
    private readonly router = inject(Router)

    public goHome(): void {
        this.router.navigateByUrl('/home')
    }
}
