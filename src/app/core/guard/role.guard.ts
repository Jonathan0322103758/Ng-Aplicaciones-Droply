import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);

  const token = typeof window !== 'undefined' && window.localStorage
    ? localStorage.getItem('token')
    : null;

  if (!token) {
    return router.createUrlTree(['/handle-routes/unauthorized']);
  }

  try {
    const payload = decodePayload(token);
    const userRole = payload.role;

    const allowedRoles: number[] = route.data['allowedRoles'] || [];

    if (!allowedRoles.includes(userRole)) {
      return router.createUrlTree(['/handle-routes/forbidden']);
    }

    return true;
  } catch {
    return router.createUrlTree(['/handle-routes/unauthorized']);
  }
};

function decodePayload(token: string): any {
  const [, payloadBase64] = token.split('.');
  return JSON.parse(atob(payloadBase64));
}
