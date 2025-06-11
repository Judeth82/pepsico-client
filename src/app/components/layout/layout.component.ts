import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmptyLayoutComponent } from './layouts/empty/empty.component';
import { GeneralLayoutComponent } from './layouts/general/general.component';
import { AuthorizationLayoutComponent } from './layouts/authorization/authorization.component';
import { LayoutType } from './layout.types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith, Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'am-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [AuthorizationLayoutComponent, EmptyLayoutComponent, GeneralLayoutComponent],
})
export class LayoutComponent implements OnInit, OnDestroy {
  protected layout!: LayoutType;

  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
      // Subscribe to NavigationEnd event
      this._router.events
      .pipe(
          filter((event) => event instanceof NavigationEnd),
          startWith(this._router.url),
          takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
          // Update the layout
          this._updateLayout();
      });
  }

   /**
     * Update the selected layout
     */
   private _updateLayout(): void {
    // Get the current activated route
    let route = this._activatedRoute;
    while (route.firstChild) {
        route = route.firstChild;
    }

    // 1. Set the layout from the config
    //this.layout = this.config.layout;

    // 2. Get the query parameter from the current route and
    // set the layout and save the layout to the config
    const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout') as LayoutType;
    if (layoutFromQueryParam) {
        this.layout = layoutFromQueryParam;
        // if (this.config) {
        //     this.config.layout = layoutFromQueryParam;
        // }
    }

    // 3. Iterate through the paths and change the layout as we find
    // a config for it.
    //
    // The reason we do this is that there might be empty grouping
    // paths or componentless routes along the path. Because of that,
    // we cannot just assume that the layout configuration will be
    // in the last path's config or in the first path's config.
    //
    // So, we get all the paths that matched starting from root all
    // the way to the current activated route, walk through them one
    // by one and change the layout as we find the layout config. This
    // way, layout configuration can live anywhere within the path and
    // we won't miss it.
    //
    // Also, this will allow overriding the layout in any time so we
    // can have different layouts for different routes.
    const paths = route.pathFromRoot;
    paths.forEach((path) => {
        // Check if there is a 'layout' data
        if (path.routeConfig && path.routeConfig.data && path.routeConfig.data['layout']) {
            // Set the layout
            this.layout = path.routeConfig.data['layout'];
        }
    });
}
}
