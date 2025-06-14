import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ServiceTrackComponent } from './service-track.component';

const routes: Array<Route> = [
  {
    path: '',
    component: ServiceTrackComponent,
    title: 'Service Tracking',
    canActivate: []
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class ServiceTrackModule { }
