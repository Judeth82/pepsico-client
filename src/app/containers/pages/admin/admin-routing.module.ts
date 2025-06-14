import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardRoute, serviceTrackRoute } from '@defaults';
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
        path: serviceTrackRoute,
        canActivate: [],
        loadChildren: () => import('./service-track/service-track.module').then((m) => m.ServiceTrackModule),
      }
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
