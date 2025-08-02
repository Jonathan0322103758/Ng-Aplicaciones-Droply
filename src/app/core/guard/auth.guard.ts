// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertMainService } from '@Component/shared/alert-main/alert-main.service';

export function authGuard(): boolean | import("@angular/router").UrlTree {
  const router = inject(Router);
  const alert = inject(AlertMainService);

  let token = ""

  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('token') ?? "";
  }

  //   const currentRoute = window.location.pathname;

  //   const allowedRoutesWithToken = [
  //     '/home',
  //     '/admin-users',
  //     '/admin-permitions',
  //     '/admin-database',
  //     '/admin-notifications',
  //     '/manage-meters',
  //     '/manage-areas',
  //     '/general-operation-progress',
  //     '/general-operation-activities'
  //   ];

  if (token) {
    return true;
  } else {
    alert.setAlert(403, 'Acceso no autorizado a esta ruta');
    return router.createUrlTree(['/auth']);
  }
}
