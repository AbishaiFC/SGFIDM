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
import {
  provideLucideIcons,
  provideLucideConfig,
  LucideHouse,
  LucideShoppingBag,
  LucidePackage2,
  LucideMonitor,
  LucideChartNoAxesColumnIncreasing,
  LucideUsersRound,
  LucideCircleQuestionMark,
  LucideFolderX,
  LucideNetwork,
  LucidePlus,
  LucideArchive,
  LucideArrowLeft,
  LucideArrowRight,
  LucideCircleDollarSign,
  LucideScanBarcode,
  LucideCircleX,
  LucideCheck,
  LucideCircleCheck,
  LucideChevronRight,
  LucideX,
  LucidePencil,
  LucideCircleAlert,
  LucideInfo,
  LucideLink,
  LucideLock,
  LucideLogIn,
  LucideLogOut,
  LucideEllipsis,
  LucideBell,
  LucideWalletCards,
  LucideUserRound,
  LucideReceiptText,
  LucidePanelLeftClose,
  LucideSave,
  LucideSearch,
  LucideSend,
  LucideSettings2,
  LucideShield,
  LucideSkipForward,
  LucideStore,
  LucideTriangleAlert,
  LucideEye,
  LucideEyeOff,
} from '@lucide/angular';
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
    provideLucideConfig({ size: 20, strokeWidth: 1.75 }),
    provideLucideIcons(
      LucideHouse, LucideShoppingBag, LucidePackage2, LucideMonitor,
      LucideChartNoAxesColumnIncreasing, LucideUsersRound, LucideCircleQuestionMark,
      LucideFolderX, LucideNetwork, LucidePlus, LucideArchive, LucideArrowLeft,
      LucideArrowRight, LucideCircleDollarSign, LucideScanBarcode, LucideCircleX,
      LucideCheck, LucideCircleCheck, LucideChevronRight, LucideX, LucidePencil,
      LucideCircleAlert, LucideInfo, LucideLink, LucideLock, LucideLogIn,
      LucideLogOut, LucideEllipsis, LucideBell, LucideWalletCards, LucideUserRound,
      LucideReceiptText, LucidePanelLeftClose, LucideSave, LucideSearch, LucideSend,
      LucideSettings2, LucideShield, LucideSkipForward, LucideStore,
      LucideTriangleAlert, LucideEye, LucideEyeOff,
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode() && environment.pwaEnabled,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    // Capa de datos: mock por defecto, fácil de cambiar a API real
    { provide: ProductoRepository, useClass: ProductoMockRepository },
    { provide: AuthRepository, useClass: AuthMockRepository },
  ],
};
