import { Route, RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in.component";
import { NgModule } from "@angular/core";
import { DefaultRedirectionGuard } from "@g/default-redirection.guard";

const routes: Array<Route> = [
  {
    path: '',
    component: SignInComponent,
    title: 'Iniciar Sesión',
    canActivate: [
      DefaultRedirectionGuard
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [
    DefaultRedirectionGuard
  ]
})
export class SignInModule {}
