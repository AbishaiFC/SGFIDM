import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { ProductoRepository } from './core/services/data/repositories/producto.repository';
import { ProductoMockRepository } from './core/services/data/mock/producto.mock.repository';
import { AuthRepository } from './core/services/data/repositories/auth.repository';
import { AuthMockRepository } from './core/services/data/mock/auth.mock.repository';
import { environment } from '../environments/environment';
/**
 * Configuración de la aplicación.
 * Los repositorios se proveen según environment.useMockData.
 * Para cambiar a API real: cambiar useClass en data-switch.service.ts.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode() && environment.pwaEnabled,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    // Capa de datos: mock por defecto, fácil de cambiar a API real
    { provide: ProductoRepository, useClass: ProductoMockRepository },
    { provide: AuthRepository, useClass: AuthMockRepository },
  ],
};
