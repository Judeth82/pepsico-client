import { Route, RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in.component";
import { NgModule } from "@angular/core";

const routes: Array<Route> = [
  {
    path: '',
    component: SignInComponent,
    title: 'Iniciar Sesión',
    canActivate: []
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class SignInModule {}
