import { Routes } from '@angular/router';
import { authGuard } from '@Guard/auth.guard';
import { roleGuard } from '@Guard/role.guard';
import { settingsRoutes } from '@Page/setting/setting.route';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./page/auth/auth.page').then((m) => m.AuthPage)
    },
    {
        path: 'home',
        loadComponent: () => import('./page/home/home.page').then((m) => m.HomePage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1, 2, 3]
        }
    },
    {
        path: 'admin-users',
        loadComponent: () => import('./page/admin/users/users.page').then((m) => m.UsersPage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1]
        }
    },
    {
        path: 'admin-permitions',
        loadComponent: () => import('./page/admin/permitions/permitions.page').then((m) => m.PermitionsPage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1]
        }
    },
    {
        path: 'admin-database',
        loadComponent: () => import('./page/admin/database/database.page').then((m) => m.DatabasePage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1]
        }
    },
    {
        path: 'admin-notifications',
        loadComponent: () => import('./page/admin/notifications/notifications.page').then((m) => m.NotificationsPage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1, 2, 3]
        }
    },
    {
        path: 'manage-meters',
        loadComponent: () => import('./page/operation/meters/meters.page').then((m) => m.MetersPage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1, 2, 3]
        }
    },
    {
        path: 'manage-areas',
        loadComponent: () => import('./page/operation/areas/areas.page').then((m) => m.AreasPage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1, 2, 3]
        }
    },
    {
        path: 'general-operation',
        loadComponent: () => import('./page/operation/general/general.page').then((m) => m.Generalpage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1, 2, 3]
        }
    },
    {
        path: 'general-operation-progress',
        loadComponent: () => import('./page/operation/progress/progress.page').then((m) => m.ProgressPage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1, 3]
        }
    },
    {
        path: 'general-operation-activities',
        loadComponent: () => import('./page/operation/activity/activity.page').then((m) => m.ActivityPage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1, 2, 3]
        }
    },
    {
        path: 'general-operation-logs',
        loadComponent: () => import('./page/operation/log/log.page').then((m) => m.LogPage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1, 2, 3]
        }
    },
    {
        path: 'reports-add-reports',
        loadComponent: () => import('./page/reports/addReports/addReports.page').then((m) => m.AddReportsPage),
        canActivate: [authGuard, roleGuard],
        data: {
            allowedRoles: [1, 2, 3]
        }
    },
    {
        path: 'handle-routes',
        children: settingsRoutes
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'handle-routes/not-found',
        pathMatch: 'full'
    }
];
