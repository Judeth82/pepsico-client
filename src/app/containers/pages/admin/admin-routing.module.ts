import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { confirmSerivceRoute, dashboardRoute } from '@defaults';
import { AuthGuard } from '@g/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [
      AuthGuard
    ],
    children: [
      {
        path: dashboardRoute,
        canActivate: [],
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: confirmSerivceRoute,
        canActivate: [],
        loadChildren: () => import('./confirm-service/confirm-service.module').then((m) => m.ConfirmServiceModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
  ],
})
export class AdminRoutingModule { }
