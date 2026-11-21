import { environment } from '../../../environments/environment';
import { ProductoRepository } from './data/repositories/producto.repository';
import { ProductoMockRepository } from './data/mock/producto.mock.repository';
import { AuthRepository } from './data/repositories/auth.repository';
import { AuthMockRepository } from './data/mock/auth.mock.repository';

/**
 * Proveedores de repositorios según environment.useMockData.
 * Se usan en app.config.ts. Cuando el backend esté listo, cambiar useClass aquí.
 */
export function proveerProductos(): object {
  if (environment.useMockData) {
    return { provide: ProductoRepository, useClass: ProductoMockRepository };
  }
  return { provide: ProductoRepository, useClass: ProductoMockRepository };
}

export function proveerAuth(): object {
  if (environment.useMockData) {
    return { provide: AuthRepository, useClass: AuthMockRepository };
  }
  return { provide: AuthRepository, useClass: AuthMockRepository };
}
