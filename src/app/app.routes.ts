import { Routes } from '@angular/router';
import { authGuard } from '@Guard/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./page/auth/auth.page').then((m) => m.AuthPage)
    },
    {
        path: 'home',
        loadComponent: () => import('./page/home/home.page').then((m) => m.HomePage),
        canActivate: [authGuard]
    },
    {
        path: 'admin-users',
        loadComponent: () => import('./page/admin/users/users.page').then((m) => m.UsersPage),
        canActivate: [authGuard]
    },
    {
        path: 'admin-permitions',
        loadComponent: () => import('./page/admin/permitions/permitions.page').then((m) => m.PermitionsPage),
        canActivate: [authGuard]
    },
    {
        path: 'admin-database',
        loadComponent: () => import('./page/admin/database/database.page').then((m) => m.DatabasePage),
        canActivate: [authGuard]
    },
    {
        path: 'admin-notifications',
        loadComponent: () => import('./page/admin/notifications/notifications.page').then((m) => m.NotificationsPage),
        canActivate: [authGuard]
    },
    {
        path: 'manage-meters',
        loadComponent: () => import('./page/operation/meters/meters.page').then((m) => m.MetersPage),
        canActivate: [authGuard]
    },
    {
        path: 'manage-areas',
        loadComponent: () => import('./page/operation/areas/areas.page').then((m) => m.AreasPage),
        canActivate: [authGuard]
    },
    {
        path: 'general-operation-progress',
        loadComponent: () => import('./page/operation/progress/progress.page').then((m) => m.ProgressPage),
        canActivate: [authGuard]
    },
    {
        path: 'general-operation-activities',
        loadComponent: () => import('./page/operation/activity/activity.page').then((m) => m.ActivityPage),
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
