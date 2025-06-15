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
        loadComponent: () => import('./page/admin/permitions/permitons.page').then((m) => m.PermitionsPage)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
