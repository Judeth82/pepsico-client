import { Routes } from '@angular/router';
import { LayoutComponent } from '@c/layout/layout.component';
import { authRoutes, dashboardRoute } from '@defaults';

export const routes: Routes = [
  // Redirect empty path to defaultRoute
  { path: '', pathMatch: 'full', redirectTo: dashboardRoute },

  // No auth routes for guests
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'authorization',
    },
    loadChildren: () => import('@pages/auth/auth.module').then((m) => m.AuthModule),
  },
  // Auth routes for authenticated users
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('@pages/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: dashboardRoute },
];
