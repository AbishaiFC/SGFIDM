import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductoRepository } from '../repositories/producto.repository';
import { Producto } from '../../../../models/producto.model';

/**
 * Implementación mock de ProductoRepository.
 * Usa of() + delay() para simular latencia de red.
 * Fácil de reemplazar por ProductoApiRepository cuando el backend esté listo.
 */
export class ProductoMockRepository implements ProductoRepository {
  private productos: Producto[] = [
    {
      codigo: 'PROD-001',
      nombre: 'Harina de Trigo 1kg',
      codigoBarras: '7501051400012',
      categoria: 'ABARROTES',
      precioVenta: 28.5,
      costoAdquisicion: 18.0,
      stockMinimo: 10,
      stockActual: 45,
      unidadMedida: 'pza',
      activo: true,
      fechaCreacion: new Date('2026-01-15'),
    },
    {
      codigo: 'PROD-002',
      nombre: 'Aceite Vegetal 900ml',
      codigoBarras: '7501051400029',
      categoria: 'ABARROTES',
      precioVenta: 45.0,
      costoAdquisicion: 32.0,
      stockMinimo: 5,
      stockActual: 12,
      unidadMedida: 'pza',
      activo: true,
      fechaCreacion: new Date('2026-01-15'),
    },
  ];

  listar(): Observable<Producto[]> {
    return of([...this.productos]).pipe(delay(400));
  }

  obtener(codigo: string): Observable<Producto | undefined> {
    return of(this.productos.find((p) => p.codigo === codigo)).pipe(delay(300));
  }

  crear(producto: Omit<Producto, 'codigo'>): Observable<Producto> {
    const nuevo: Producto = {
      ...producto,
      codigo: `PROD-${String(this.productos.length + 1).padStart(3, '0')}`,
      fechaCreacion: new Date(),
    };
    this.productos.push(nuevo);
    return of(nuevo).pipe(delay(500));
  }

  actualizar(codigo: string, cambios: Partial<Producto>): Observable<Producto> {
    const idx = this.productos.findIndex((p) => p.codigo === codigo);
    if (idx === -1) {
      throw new Error(`Producto ${codigo} no encontrado`);
    }
    this.productos[idx] = { ...this.productos[idx], ...cambios };
    return of(this.productos[idx]).pipe(delay(400));
  }

  archivar(codigo: string): Observable<void> {
    const idx = this.productos.findIndex((p) => p.codigo === codigo);
    if (idx === -1) {
      throw new Error(`Producto ${codigo} no encontrado`);
    }
    this.productos[idx].activo = false;
    return of(undefined).pipe(delay(300));
  }

  reactivar(codigo: string): Observable<void> {
    const idx = this.productos.findIndex((p) => p.codigo === codigo);
    if (idx === -1) {
      throw new Error(`Producto ${codigo} no encontrado`);
    }
    this.productos[idx].activo = true;
    return of(undefined).pipe(delay(300));
  }
}
