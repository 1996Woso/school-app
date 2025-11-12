import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './_interceptors/loading.interceptor';
import { provideToastr} from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideAnimations(),

    //For ngx-spinner
    importProvidersFrom(NgxSpinnerModule),
    //For ngx-toastr
    provideToastr({
      positionClass: 'toastr-top-center',
      timeOut: 6000,
      preventDuplicates: true,
      closeButton: false,
    }),
  ],
};
