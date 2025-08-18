import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { authRoutes, confirmSerivceRoute } from '@defaults';
import { ClientDemandModel } from '@m/client-demand.model';
import { ClienteModel } from '@m/cliente.model';
import { ServicioModel } from '@m/servicio.model';
import { SupervisorModel } from '@m/supervisor.model';
import { ClientDemandHelperService } from '@s/client-demand-helper.service';
import { ClienteDataService } from '@s/cliente-data.service';
import { LocalSessionService } from '@s/local-session.service';
import { ServicioDataService } from '@s/servicio-data.service';
import { SupervisorDataService } from '@s/supervisor-data.service';
import { combineLatest, filter, of, Subject, switchMap, takeUntil } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'pco-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  protected displayedColumns$ = signal(['serviceNumber', 'client', 'supervisor', 'servicio', 'estado']);
  protected dataSource$ = signal(new MatTableDataSource<ClientDemandModel>([]));
  protected sessionData$ = signal<any>(null);
  protected isAdmin$ = signal(false);
  protected serviciosMapByCode$ = signal<Record<string, ServicioModel>>({});
  protected clientesMapById$ = signal<Record<string, ClienteModel>>({});
  protected supervisorMapById$ = signal<Record<string, SupervisorModel>>({});
  protected signInRoute = `/${authRoutes.signInRoute}`;

  private _destroy$ = new Subject<void>();

  constructor(
    protected servicioDataService: ServicioDataService,
    private _clienteDataService: ClienteDataService,
    private _supervisorDataService: SupervisorDataService,
    private _clientDemandHelperService: ClientDemandHelperService,
    private _localSessionService: LocalSessionService,
    private _router: Router,
  ) {
    combineLatest([
      this.servicioDataService.loaded$.pipe(
        filter((v) => !!v),
        switchMap(() => this.servicioDataService.entityMapByCode$)
      ),
      this._clienteDataService.loaded$.pipe(
        filter((v) => !!v),
        switchMap(() => this._clienteDataService.entityMapById$)
      ),
      this._supervisorDataService.loaded$.pipe(
        filter((v) => !!v),
        switchMap(() => this._supervisorDataService.entityMapById$)
      ),
    ]).pipe(takeUntil(this._destroy$)).subscribe(([serviciosMapByCode, clientesMapById, supervisorMapById]) => {
      this.serviciosMapByCode$.set(serviciosMapByCode);
      this.clientesMapById$.set(clientesMapById);
      this.supervisorMapById$.set(supervisorMapById);
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngAfterViewInit(): void {
    const sessionId = this._localSessionService.getSession();
    if (!sessionId) {
      this.logout();
    }

    combineLatest([
      this._clienteDataService.loaded$.pipe(
        filter((v) => !!v),
        switchMap(() => this._clienteDataService.entities$)
      ),
      this._supervisorDataService.loaded$.pipe(
        filter((v) => !!v),
        switchMap(() => this._supervisorDataService.entities$)
      ),
    ]).pipe(takeUntil(this._destroy$)).subscribe(([clients, supervisores]) => {
      const client = (clients || []).find((e) => e.id === sessionId);
      const supervisor = (supervisores || []).find((e) => e.id === sessionId);

      if (client) {
        this.sessionData$.set(client);
        this.isAdmin$.set(false);
      } else if (supervisor) {
        this.sessionData$.set(supervisor);
        this.isAdmin$.set(true);
        this.loadClientDemandData();
      } else {
        this.logout();
      }
    });
  }

  protected onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value || '';
    this.dataSource$.update((v) => {
      v.filter = value.toLowerCase();
      return v;
    });
  }

  protected logout(): void {
    this._localSessionService.clearSession();
    this._router.navigate([this.signInRoute]);
  }

  protected confirmService(service: ServicioModel): void {
    if (service && service.code) {
      this._router.navigate([confirmSerivceRoute, service.code]);
    }
  }

  private loadClientDemandData(): void {
    this._clientDemandHelperService.getAll().subscribe((data) => {
      data = data.map((d) => ({
        ...d,
        clientName: d.idClient ? this.clientesMapById$()[d.idClient]?.nombre : null,
        supervisorName: d.idSupervisor ? this.supervisorMapById$()[d.idSupervisor]?.nombre : null,
        serviceName: d.serviceCode ? this.serviciosMapByCode$()[d.serviceCode]?.name : null
      }));

      this.dataSource$.set(new MatTableDataSource(data || []));
      this.dataSource$.update((v) => {
        v.filterPredicate = function (data, filter: string): boolean {
          return JSON.stringify(data).toLowerCase().includes(filter);
        };
        return v;
      });
    });
  }
}
