import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonComponent } from "@Component/UI/standalone";

@Component({
    selector: 'page-forbidden',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './forbidden.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForbiddenPage {
    private readonly router = inject(Router)

    public goHome(): void {
        this.router.navigateByUrl('/home')
    }
}
