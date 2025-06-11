import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'authorization-layout',
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
  imports: [CommonModule, RouterModule],
})
export class AuthorizationLayoutComponent {

}
