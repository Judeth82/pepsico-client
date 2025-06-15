import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { authRoutes, confirmSerivceRoute } from '@defaults';
import { ClienteModel } from '@m/cliente.model';
import { ServicioModel } from '@m/servicio.model';
import { ClienteDataService } from '@s/cliente-data.service';
import { LocalSessionService } from '@s/local-session.service';
import { ServicioDataService } from '@s/servicio-data.service';
import { of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'pco-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  protected clientData = signal<ClienteModel | null>(null);
  protected signInRoute = `/${authRoutes.signInRoute}`;

  private _destroy$ = new Subject<void>();

  constructor(
    protected servicioDataService: ServicioDataService,
    private _router: Router,
    private _clienteDataService: ClienteDataService,
    private _localSessionService: LocalSessionService,
  ) { }

  ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete();
  }

  ngAfterViewInit(): void {
    const clientId = this._localSessionService.getSession();
    if (!clientId) {
      this.logout();
    }

    this._clienteDataService.entities$.pipe(
      switchMap((entities) => of((entities || []).find((e) => e.id === clientId))),
      takeUntil(this._destroy$),
    ).subscribe((client) => this.clientData.set(client as ClienteModel));
  }

  protected logout(): void {
    this._localSessionService.clearSession();
    this._router.navigate([this.signInRoute]);
  }

  protected confirmService(service: ServicioModel): void {
    if(service && service.code) {
      this._router.navigate([confirmSerivceRoute, service.code]);
    }
  }
}
