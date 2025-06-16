import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputDelayMS } from '@constants';
import { authRoutes, dashboardRoute } from '@defaults';
import { ClienteModel } from '@m/cliente.model';
import { ClienteDataService } from '@s/cliente-data.service';
import { LocalSessionService } from '@s/local-session.service';
import { map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'pco-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatProgressSpinner,
  ],
})
export class RegisteredComponent implements AfterViewInit, OnDestroy {
  protected networkActive = signal(false);
  protected clientData = signal<ClienteModel | null>(null);

  private _destroy$ = new Subject<void>();

  constructor(
    private _clienteDataService: ClienteDataService,
    private _localSessionService: LocalSessionService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {

  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngAfterViewInit(): void {
    this._route.params.pipe(
      map((params) => params['id']),
      tap(() => this.networkActive.set(true)),
      switchMap((data) => {
        return this._clienteDataService.entities$.pipe(
          switchMap((entities) => of((entities || []).find((e) => e.id === data)))
        )
      }),
      takeUntil(this._destroy$),
    ).subscribe((cliente) => {
      if (cliente) {
        this.clientData.set(cliente);
        this.networkActive.set(false);
      } else {
        this.networkActive.set(false);
        this.goBack();
      }
    });
  }

  protected login(): void {
    if (this.networkActive()) {
      return;
    }


    this.networkActive.set(true);
    setTimeout(() => {
      if (this.clientData()) {
        this._localSessionService.saveSession(this.clientData()?.id ?? null);
        this._router.navigate([dashboardRoute]);
        this.networkActive.set(false);
      }
    }, InputDelayMS);
  }

  protected goBack(): void {
    this._router.navigate([authRoutes.signInRoute]);
  }
}
