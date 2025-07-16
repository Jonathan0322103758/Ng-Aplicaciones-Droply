import { Routes } from '@angular/router';

export const routes: Routes = [
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
        path: 'admin-notifications',
        loadComponent: () => import('./page/admin/notifications/notifications.page').then((m) => m.NotificationsPage)
    },
    {
        path: 'admin-meters',
        loadComponent: () => import('./page/admin/meters/meters.page').then((m) => m.MetersPage)
    },
    {
        path: 'general-operation-activities',
        loadComponent: () => import('./page/operation/activity/activity.page').then((m) => m.ActivityPage)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
