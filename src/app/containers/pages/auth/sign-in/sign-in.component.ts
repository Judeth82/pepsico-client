import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { SignInFormComponent } from '@c/auth';
import { InputDelayMS } from '@constants';
import { authRoutes, dashboardRoute } from '@defaults';
import { ClienteDataService } from '@s/cliente-data.service';
import { LocalSessionService } from '@s/local-session.service';
import { SupervisorDataService } from '@s/supervisor-data.service';
import { combineLatest, delay, filter, of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'am-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinner,
    SignInFormComponent,
  ],
})
export class SignInComponent implements OnDestroy {
  @ViewChild(SignInFormComponent) signInForm!: SignInFormComponent;

  protected networkActive = signal(false);
  protected message = signal<string | null>(null);

  protected registerRoute = `/${authRoutes.registerRoute}`;
  protected dashboardRoute = `/${dashboardRoute}`;

  private _destroy$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _localSessionService: LocalSessionService,
    private _clienteDataService: ClienteDataService,
    private _supervisorDataService: SupervisorDataService,
  ) { }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  protected login(): void {
    if (this.networkActive() || !this.signInForm.value) {
      return;
    }

    const sessionId = this.signInForm.value.clientId;
    this.networkActive.set(true);
    this.message.set(null);

    combineLatest([
      this._clienteDataService.loaded$.pipe(
        filter((v) => !!v),
        switchMap(() => this._clienteDataService.entities$)
      ),
      this._supervisorDataService.loaded$.pipe(
        filter((v) => !!v),
        switchMap(() => this._supervisorDataService.entities$)
      ),
    ]).pipe(
      delay(InputDelayMS),
      takeUntil(this._destroy$)
    ).subscribe(([clients, supervisores]) => {
      const client = (clients || []).find((e) => e.id === sessionId);
      const supervisor = (supervisores || []).find((s) => s.correo === sessionId);

      if (client) {
        this._localSessionService.saveSession(client.id);
        this._router.navigate([this.dashboardRoute]);
      } else if (supervisor) {
        this._localSessionService.saveSession(supervisor.id);
        this._router.navigate([this.dashboardRoute]);
      } else {
        this.message.set('Lo sentimos no pudimos encontrar su numero de cliente');
      }
    }, () => {
      this.message.set('Lo sentimos, ocurrio un problema al validar tus datos');
      this.networkActive.set(false);
    });
  }
}
