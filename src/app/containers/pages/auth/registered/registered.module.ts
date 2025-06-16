import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisteredComponent } from './registered.component';

const routes: Array<Route> = [
  {
    path: ':id',
    component: RegisteredComponent,
    title: 'Cliente Registrado',
    canActivate: []
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class RegisteredModule {}
