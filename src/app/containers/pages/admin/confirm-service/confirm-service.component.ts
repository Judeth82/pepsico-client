import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { dashboardRoute } from '@defaults';
import { ClienteModel } from '@m/cliente.model';
import { SendEmailRequestModel } from '@m/send-email-request';
import { ServicioModel } from '@m/servicio.model';
import { ClienteDataService } from '@s/cliente-data.service';
import { DialogsService } from '@s/dialogs/dialogs.service';
import { DistritoDataService } from '@s/distrito-data.service';
import { EmailHelperService } from '@s/email-helper.service';
import { LocalSessionService } from '@s/local-session.service';
import { ServicioDataService } from '@s/servicio-data.service';
import { SupervisorDataService } from '@s/supervisor-data.service';
import { combineLatest, filter, map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';

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
    private _emailHelperService: EmailHelperService,
    private _servicioDataService: ServicioDataService,
    private _clienteDataService: ClienteDataService,
    private _localSessionService: LocalSessionService,
    private _dialogsService: DialogsService,
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

  protected async confirmService(): Promise<void> {
    combineLatest([
      this.supervisorDataService.loaded$.pipe(
        filter((v) => !!v),
        switchMap(() => this.supervisorDataService.entityMapByDistrito$),
      ),
      this.distritoDataService.loaded$.pipe(
        filter((v) => !!v),
        switchMap(() => this.distritoDataService.entityMapByPrefix$),
      )
    ]).pipe(takeUntil(this._destroy$)).subscribe(([distritoMapByDistrito, distritoMapByPrefix]) => {
      const distrito = distritoMapByPrefix[this.selectedDistritoPrefix()];
      const supervisor = distritoMapByDistrito[distrito.id];
      const guidNum = Math.floor(Math.random() * 8999999 + 100000);

      const payload: SendEmailRequestModel = {
        to: supervisor.correo,
        subject: `Solicitud de servicio`,
        htmlMessage: `
          Hola ${supervisor}, el cliente ${this.clientData()?.nombre} a solicitado el siguiente servicio ${this.selectedService()?.name}.
          Para mas seguimiento favor de usar el siguiente numeor de rastreo ${guidNum} para visita al distrito ${distrito.prefix}.
        `
      }

      this._emailHelperService.send(payload).pipe(takeUntil(this._destroy$)).subscribe(async (resp) => {
        if (resp?.success) {
          const message = `
            <span class="text-primary-700 font-semibold">
              Se a notificado a <span class="text-orange-500 font-bold">${supervisor.nombre}</span> hacerca de la solicitud de tu servicio,
              porfavor guarda el siguiente numero  de guia <span class="text-orange-500 font-bold">${guidNum}</span> para futuro seguimiento.
              Pronto recibiras la visita en el distrito <span class="text-orange-500 font-bold">${distrito.prefix}</span>,
              para cualquier duda contactar al numero <span class="text-orange-500 font-bold">${supervisor.telefono}</span>.
            </span>
          `;
          await this._dialogsService.info(message);

          this._router.navigate([dashboardRoute]);
        } else {
          await this._dialogsService.info('Algo salio mal al momento de enviar el correo, favor de intentar mas tarde.');
        }
      });
    });
  }

  protected goBack(): void {
    this._router.navigate([dashboardRoute]);
  }
}
