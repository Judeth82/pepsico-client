import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SignInFormComponent } from '@c/auth';
import { authRoutes } from '@defaults';

@Component({
  standalone: true,
  selector: 'am-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    SignInFormComponent,
  ],
})
export class SignInComponent {
  protected registerRoute = `/${authRoutes.registerRoute}`;

  protected submit(): void {

  }
}
