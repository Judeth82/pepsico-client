import { NgModule } from '@angular/core';
import { ConfirmServiceComponent } from './confirm-service.component';
import { Route, RouterModule } from '@angular/router';

const routes: Array<Route> = [
  {
    path: ':id',
    component: ConfirmServiceComponent,
    title: 'Dashboard',
    canActivate: []
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class ConfirmServiceModule { }
