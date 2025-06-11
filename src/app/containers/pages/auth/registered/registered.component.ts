import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { authRoutes } from '@defaults';

@Component({
  selector: 'pco-registered',
  templateUrl: './registered.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
})
export class RegisteredComponent {
  protected signInRoute = `/${authRoutes.signInRoute}`;
}
