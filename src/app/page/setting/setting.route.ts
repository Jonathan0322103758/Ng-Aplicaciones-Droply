import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
    {
        path: 'forbidden',
        loadComponent: () => import('./forbidden/forbidden.page').then((m) => m.ForbiddenPage),
    },
    {
        path: 'not-found',
        loadComponent: () => import('./not-found/not-found.page').then((m) => m.NotFoundPage),
    },
    {
        path: 'unauthorized',
        loadComponent: () => import('./unauthorized/unauthorized.page').then((m) => m.UnauthorizedPage),
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
