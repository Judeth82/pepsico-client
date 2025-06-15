import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PCOPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data && route.data['preload']
      ? timer(route.data && route.data['delay'] ? route.data['delay'] : 0)
        .pipe(switchMap(() => load().pipe(catchError(() => of(null)))))
      : of(null);
  }
}
