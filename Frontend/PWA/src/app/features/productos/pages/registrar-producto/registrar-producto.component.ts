import { SgfidmIconComponent } from './../../../../shared/components/atoms/icon/sgfidm-icon.component';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { Producto } from '../../../../models/producto.model';

/**
 * PROD-02 — Productos: Registrar (Módulo 04), en modo Solo (Figma 1145:84769).
 *
 * Reutiliza el PanelCard (molécula), FormField (molécula que envuelve el input)
 * y Button. Para el selector y el textarea no existe una molécula en el DS:
 * se estilizan con los tokens SGFIDM sin usar el átomo text-field directamente.
 */
@Component({
  standalone: true,
  imports: [SgfidmIconComponent, FormsModule, SgfidmPanelCardComponent, SgfidmFormFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-registrar-producto',
  styleUrl: './registrar-producto.component.scss',
  templateUrl: './registrar-producto.component.html',
})
export class RegistrarProductoComponent {
  private readonly router = inject(Router);

  readonly codigo = signal('PROD-129');
  readonly nombre = signal('');
  readonly codigoBarras = signal('');
  readonly categoria = signal('Sin categoría');
  readonly precio = signal('');
  readonly costo = signal('');
  readonly descripcion = signal('');
  readonly unidadMedida = signal('Unidad');
  readonly stockMinimo = signal('0');

  readonly unidades = ['Unidad', 'Caja', 'Paquete', 'Kilogramo', 'Litro', 'Metro'];
  readonly maxNombre = 120;
  readonly maxCodigoBarras = 50;
  readonly maxDescripcion = 500;

  readonly error = signal('');

  get descripcionLength(): number {
    return this.descripcion().length;
  }

  onRegistrar(): void {
    const nombre = this.nombre().trim();
    if (!nombre) {
      this.error.set('El nombre del producto es obligatorio.');
      return;
    }
    if (nombre.length > this.maxNombre) {
      this.error.set(`El nombre no puede superar los ${this.maxNombre} caracteres.`);
      return;
    }

    const precioTexto = this.precio().trim();
    const precio = Number(precioTexto.replace(/,/g, ''));
    if (!precioTexto || !Number.isFinite(precio) || precio < 0) {
      this.error.set('Ingresa un precio de venta válido.');
      return;
    }

    const costoTexto = this.costo().trim();
    const costo = costoTexto ? Number(costoTexto.replace(/,/g, '')) : undefined;
    if (costo !== undefined && (!Number.isFinite(costo) || costo < 0)) {
      this.error.set('Ingresa un costo de adquisición válido.');
      return;
    }

    const stock = Number(this.stockMinimo());
    if (!Number.isFinite(stock) || stock < 0) {
      this.error.set('Ingresa un stock mínimo válido.');
      return;
    }

    const producto: Producto = {
      codigo: this.codigo().trim() || 'PROD-129',
      nombre,
      codigoBarras: this.codigoBarras().trim() || undefined,
      categoria: this.categoria() === 'Sin categoría' ? undefined : this.categoria(),
      precioVenta: precio,
      costoAdquisicion: costo,
      descripcion: this.descripcion().trim() || undefined,
      stockMinimo: stock,
      stockActual: 0,
      unidadMedida: this.unidadMedida(),
      activo: true,
      fechaCreacion: new Date(),
    };

    try {
      const existentes: Producto[] = JSON.parse(localStorage.getItem('sgfidm-productos') || '[]');
      localStorage.setItem('sgfidm-productos', JSON.stringify([...existentes, producto]));
      // INICIO-02: el primer producto completa el ítem del checklist.
      localStorage.setItem('sgfidm-primer-producto', 'true');
    } catch {
      // Sin almacenamiento: el formulario conserva los valores en memoria.
    }
    this.router.navigate(['/dashboard']);
  }

  gestionarCategorias(): void {
    this.router.navigate(['/productos/categorias']);
  }

  onCancelar(): void {
    this.router.navigate(['/dashboard']);
  }
}
