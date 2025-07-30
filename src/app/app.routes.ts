import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./page/auth/auth.page').then((m) => m.AuthPage)
    },
    {
        path: 'home',
        loadComponent: () => import('./page/home/home.page').then((m) => m.HomePage)
    },
    {
        path: 'admin-users',
        loadComponent: () => import('./page/admin/users/users.page').then((m) => m.UsersPage)
    },
    {
        path: 'admin-permitions',
        loadComponent: () => import('./page/admin/permitions/permitions.page').then((m) => m.PermitionsPage)
    },
    {
        path: 'admin-database',
        loadComponent: () => import('./page/admin/database/database.page').then((m) => m.DatabasePage)
    },
    {
        path: 'admin-notifications',
        loadComponent: () => import('./page/admin/notifications/notifications.page').then((m) => m.NotificationsPage)
    },
    {
        path: 'manage-meters',
        loadComponent: () => import('./page/operation/meters/meters.page').then((m) => m.MetersPage)
    },    
    {
        path: 'manage-areas',
        loadComponent: () => import('./page/operation/areas/areas.page').then((m) => m.AreasPage)
    },
    {
        path: 'general-operation-progress',
        loadComponent: () => import('./page/operation/progress/progress.page').then((m) => m.ProgressPage)
    },
    {
        path: 'general-operation-activities',
        loadComponent: () => import('./page/operation/activity/activity.page').then((m) => m.ActivityPage)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
