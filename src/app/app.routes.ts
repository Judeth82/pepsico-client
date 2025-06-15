import { Routes } from '@angular/router';
import { LayoutComponent } from '@c/layout/layout.component';
import { defaultRoute } from '@defaults';

export const routes: Routes = [
  // Redirect empty path to defaultRoute
  { path: '', pathMatch: 'full', redirectTo: defaultRoute },

  // Redirect signed in user to the defaultRoute
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: defaultRoute },

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
  { path: '**', redirectTo: defaultRoute },
];
