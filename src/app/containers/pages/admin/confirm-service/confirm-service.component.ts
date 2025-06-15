import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { dashboardRoute } from '@defaults';
import { ClienteModel } from '@m/cliente.model';
import { ServicioModel } from '@m/servicio.model';
import { ClienteDataService } from '@s/cliente-data.service';
import { DistritoDataService } from '@s/distrito-data.service';
import { LocalSessionService } from '@s/local-session.service';
import { ServicioDataService } from '@s/servicio-data.service';
import { SupervisorDataService } from '@s/supervisor-data.service';
import { map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'pco-confirm-service',
  templateUrl: './confirm-service.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class ConfirmServiceComponent implements AfterViewInit, OnDestroy {
  protected networkActive = signal(false);

  protected selectedService = signal<ServicioModel | null>(null);
  protected clientData = signal<ClienteModel | null>(null);
  protected selectedDistritoPrefix = signal<string>('');

  private _destroy$ = new Subject<void>();

  constructor(
    protected distritoDataService: DistritoDataService,
    protected supervisorDataService: SupervisorDataService,
    private _servicioDataService: ServicioDataService,
    private _clienteDataService: ClienteDataService,
    private _localSessionService: LocalSessionService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngAfterViewInit(): void {
    this._route.params.pipe(
      map((params) => params['id']),
      tap(() => this.networkActive.set(true)),
      switchMap((data) => {
        return this._servicioDataService.entities$.pipe(
          switchMap((entities) => of((entities || []).find((e) => e.code === data)))
        )
      }),
      takeUntil(this._destroy$),
    ).subscribe((service) => {
      if (service) {
        this.selectedService.set(service);
        const clientId = this._localSessionService.getSession();

        this._clienteDataService.entities$.pipe(
          switchMap((entities) => of((entities || []).find((e) => e.id === clientId))),
          takeUntil(this._destroy$),
        ).subscribe((client) => {
          this.networkActive.set(false);
          this.clientData.set(client as ClienteModel);
          this.selectedDistritoPrefix.set(client?.distrito ?? '');
        });
      } else {
        this.networkActive.set(false);
        this.goBack();
      }
    });
  }

  protected goBack(): void {
    this._router.navigate([dashboardRoute]);
  }
}
