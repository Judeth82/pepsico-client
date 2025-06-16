import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { RegisterFormComponent } from '@c/auth/register-form';
import { InputDelayMS } from '@constants';
import { authRoutes } from '@defaults';
import { ClienteModel } from '@m/cliente.model';
import { ClienteDataService } from '@s/cliente-data.service';

@Component({
  selector: 'pco-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatProgressSpinner,
    RegisterFormComponent
  ],
})
export class RegisterComponent {
  @ViewChild(RegisterFormComponent) registerForm!: RegisterFormComponent;

  protected networkActive = signal(false);
  protected signInRoute = `/${authRoutes.signInRoute}`;
  protected registeredRoute = `/${authRoutes.registeredRoute}`;

  constructor(
    private _clienteDataService: ClienteDataService,
    private _router: Router,
  ) { }

  protected addItem(): void {
    if (this.networkActive() || !this.registerForm.value) {
      return;
    }

    const id = `${Math.floor(Math.random() * 8999999999 + 100000)}`;

    const saveData = {
      ...this.registerForm.value,
      id,
    } as unknown as ClienteModel;

    this.networkActive.set(true);
    setTimeout(() => {
      this._clienteDataService.add(saveData);
      this.networkActive.set(false);
      this._router.navigate([this.registeredRoute, saveData.id]);
    }, InputDelayMS);
  }
}
