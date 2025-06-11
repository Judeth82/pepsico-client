import { Routes } from '@angular/router';
import { LayoutComponent } from '@c/layout/layout.component';
import { authRoutes } from '@defaults';

export const routes: Routes = [
  // Redirect empty path to defaultRoute
  { path: '', pathMatch: 'full', redirectTo: authRoutes.signInRoute },

  // No auth routes for guests
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'authorization',
    },
    loadChildren: () => import('@pages/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: authRoutes.signInRoute },
];
