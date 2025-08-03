// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertMainService } from '@Component/shared/alert-main/alert-main.service';

export function authGuard(): boolean | import("@angular/router").UrlTree {
  const router = inject(Router);
  const alert = inject(AlertMainService);

  const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null

  if (token) {
    return true;
  } else {
    alert.setAlert(403, 'Acceso no autorizado a esta ruta');
    return router.createUrlTree(['/auth']);
  }
}
