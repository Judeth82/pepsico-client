import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) { }

    public redirectToDefault(): void {
        // Set the redirect url.
        // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
        // to the correct page after a successful sign in. This way, that url can be set via
        // routing file and we don't have to touch here.
        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectUrl') || '/signed-in-redirect';
        this._router.navigateByUrl(redirectURL);
    }
}
