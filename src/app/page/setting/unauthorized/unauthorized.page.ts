import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonComponent } from "@Component/UI/standalone";

@Component({
    selector: 'page-unauthorized',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './unauthorized.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedPage {
    private readonly router = inject(Router)

    public goHome(): void {
        this.router.navigateByUrl('/home')
    }
}
