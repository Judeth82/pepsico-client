import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  GuardResult,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { authRoutes } from '@defaults';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { LocalSessionService } from '@s/local-session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _router: Router,
    private _localSessionService: LocalSessionService,
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GuardResult> {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GuardResult> {
    return of(this._localSessionService.isLogged()).pipe(
      catchError((error) => {
        //TODO: handle errors other than 401
        return of(this._router.createUrlTree([`/${authRoutes.signInRoute}`], { queryParams: { redirectUrl: state.url } }));
      }),
      switchMap((result: GuardResult) => {
        if (result instanceof UrlTree || result instanceof RedirectCommand) {
          return of(result);
        }

        if (!result) {
          return of(
            this._router.createUrlTree([`/${authRoutes.signInRoute}`])
          );
        }

        return of(true);
      })
    );
  }
}
