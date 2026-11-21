import { Observable } from 'rxjs';
import { Producto } from '../../../../models/producto.model';

/**
 * Contrato del repositorio de Productos.
 * Implementaciones: ProductoMockRepository (mock) / ProductoApiRepository (API real).
 * Las vistas dependen solo de esta interfaz; cambiar la implementación es cuestión de provider.
 */
export abstract class ProductoRepository {
  abstract listar(): Observable<Producto[]>;
  abstract obtener(codigo: string): Observable<Producto | undefined>;
  abstract crear(producto: Omit<Producto, 'codigo'>): Observable<Producto>;
  abstract actualizar(codigo: string, cambios: Partial<Producto>): Observable<Producto>;
  abstract archivar(codigo: string): Observable<void>;
  abstract reactivar(codigo: string): Observable<void>;
}
