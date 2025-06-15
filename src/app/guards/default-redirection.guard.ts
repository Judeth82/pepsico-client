import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@s/auth.service';
import { LocalSessionService } from '@s/local-session.service';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable()
export class DefaultRedirectionGuard  {
    constructor(
      protected router: Router,
      private _auth: AuthService,
      private _localSessionService: LocalSessionService,
    ) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }

    canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
        if (this._localSessionService.isLogged()) {
            this._auth.redirectToDefault();
            return of(false);
        }

        return of(true);
    };
}
