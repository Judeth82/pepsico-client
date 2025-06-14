import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule } from '@angular/router';

const routes: Array<Route> = [
  {
    path: '',
    component: DashboardComponent,
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
export class DashboardModule { }
