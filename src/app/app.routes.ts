import { Routes } from '@angular/router';
import { authGuard } from '@Guard/auth.guard';
import { roleGuard } from '@Guard/role.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./page/auth/auth.page').then((m) => m.AuthPage)
    },
    {
        path: 'home',
        loadComponent: () => import('./page/home/home.page').then((m) => m.HomePage),
        canActivate: [authGuard, roleGuard]
    },
    {
        path: 'admin-users',
        loadComponent: () => import('./page/admin/users/users.page').then((m) => m.UsersPage),
        canActivate: [authGuard, roleGuard]
    },
    {
        path: 'admin-permitions',
        loadComponent: () => import('./page/admin/permitions/permitions.page').then((m) => m.PermitionsPage),
        canActivate: [authGuard, roleGuard]
    },
    {
        path: 'admin-database',
        loadComponent: () => import('./page/admin/database/database.page').then((m) => m.DatabasePage),
        canActivate: [authGuard, roleGuard]
    },
    {
        path: 'admin-notifications',
        loadComponent: () => import('./page/admin/notifications/notifications.page').then((m) => m.NotificationsPage),
        canActivate: [authGuard, roleGuard]
    },
    {
        path: 'manage-meters',
        loadComponent: () => import('./page/operation/meters/meters.page').then((m) => m.MetersPage),
        canActivate: [authGuard, roleGuard]
    },
    {
        path: 'manage-areas',
        loadComponent: () => import('./page/operation/areas/areas.page').then((m) => m.AreasPage),
        canActivate: [authGuard, roleGuard]
    },
    {
        path: 'general-operation-progress',
        loadComponent: () => import('./page/operation/progress/progress.page').then((m) => m.ProgressPage),
        canActivate: [authGuard, roleGuard]
    },
    {
        path: 'general-operation-activities',
        loadComponent: () => import('./page/operation/activity/activity.page').then((m) => m.ActivityPage),
        canActivate: [authGuard, roleGuard]
    },
    {
        path: 'general-operation-logs',
        loadComponent: () => import('./page/admin/activities/log/log.page').then((m) => m.LogPage)
    },
    {
        path: 'reports-add-reports',
        loadComponent: () => import('./page/reports/addReports/addReports.page').then((m) => m.AddReportsPage)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
