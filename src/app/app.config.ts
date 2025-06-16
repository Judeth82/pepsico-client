import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { PCOPreloadingStrategy } from '@u/strategies';
import { provideFuse } from '@s/splash-screen/fuse.provider';
import { AllDialogsModule } from '@dialogs/all-dialogs.module';
import { FormDefaultsModule } from '@c/shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }), withPreloading(PCOPreloadingStrategy)),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(AllDialogsModule, FormDefaultsModule),
    provideFuse({
      fuse: {
        layout: 'classy',
        scheme: 'light',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
        theme: 'theme-tejas',
        themes: [
          {
            id: 'theme-default',
            name: 'Default',
          },
          {
            id: 'theme-brand',
            name: 'Brand',
          },
          {
            id: 'theme-tejas',
            name: 'Tejas',
          },
        ],
      },
    }),
  ],
};
