import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AlertMainService } from '@Component/shared/alert-main/alert-main.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const router = inject(Router);
    const alert = inject(AlertMainService);

    const roleDic: Record<number, string> = {
        1: 'Desarrollador',
        2: 'Administrador',
        3: 'Gerente',
        4: 'Auditor',
    };

    const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null
    if (!token) {
        alert.setAlert(403, 'No hay token disponible. Asegurate de iniciar sesión');
        return router.createUrlTree(['/auth']);
    }

    try {
        const payload = decodePayload(token);
        const userRole = payload.role;

        const allowedRoles: number[] = route.data['allowedRoles'] || [];

        if (!allowedRoles.includes(userRole)) {
            const roleName = roleDic[userRole] ?? `Rol desconocido (${userRole})`;
            alert.setAlert(403, `Acceso denegado. No es posible acceder a esta ruta por seguridad.`);
            return router.createUrlTree(['/unauthorized']);
        }

        return true;
    } catch {
        alert.setAlert(403, 'Token inválido.');
        return router.createUrlTree(['/auth']);
    }
};

function decodePayload(token: string): any {
    const [, payloadBase64] = token.split('.');
    return JSON.parse(atob(payloadBase64));
}
