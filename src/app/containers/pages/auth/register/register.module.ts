import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';

const routes: Array<Route> = [
  {
    path: '',
    component: RegisterComponent,
    title: 'Registrar Cliente',
    canActivate: []
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class RegisterModule {}
