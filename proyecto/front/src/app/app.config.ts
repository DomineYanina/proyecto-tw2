import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/auth.interceptor'; // 👈 importa tu interceptor

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: 'Aura'
      }
    }),
    MessageService,
    // 👇 combinación de fetch + interceptor
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor]))
  ]
};
