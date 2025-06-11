import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRoutes } from '@defaults';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: authRoutes.signInRoute,
        canActivate: [],
        loadChildren: () => import('./sign-in/sign-in.module').then((m) => m.SignInModule),
      },
      {
        path: authRoutes.registerRoute,
        canActivate: [],
        loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: authRoutes.registeredRoute,
        canActivate: [],
        loadChildren: () => import('./registered/registered.module').then((m) => m.RegisteredModule),
      },
      {
        path: '',
        redirectTo: authRoutes.signInRoute,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
