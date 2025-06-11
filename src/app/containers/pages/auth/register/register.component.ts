import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RegisterFormComponent } from '@c/auth/register-form';
import { authRoutes } from '@defaults';

@Component({
  selector: 'pco-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    RegisterFormComponent
  ],
})
export class RegisterComponent {
  protected signInRoute = `/${authRoutes.signInRoute}`;
  protected registeredRoute = `/${authRoutes.registeredRoute}`;
}
