import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

type ModoOperacion = 'solo' | 'empleados' | 'sucursales';

/** INICIO-01 — Bienvenida y configuración (estado pending_config, §3.2). */
@Component({
  standalone: true,
  imports: [FormsModule, SgfidmFormFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-bienvenida-configuracion',
  styleUrl: './bienvenida-configuracion.component.scss',
  templateUrl: './bienvenida-configuracion.component.html',
})
export class BienvenidaConfiguracionComponent {
  private readonly router = inject(Router);

  readonly modos: Array<{ id: ModoOperacion; titulo: string; descripcion: string; icono: string }> = [
    {
      id: 'solo',
      titulo: 'Trabajo solo',
      descripcion: 'Ideal si tú atiendes y administras tu negocio.',
      icono: 'person',
    },
    {
      id: 'empleados',
      titulo: 'Tengo empleados',
      descripcion: 'Ideal si varias personas trabajan contigo.',
      icono: 'groups',
    },
    {
      id: 'sucursales',
      titulo: 'Tengo sucursales',
      descripcion: 'Ideal si operas en dos o más locales.',
      icono: 'storefront',
    },
  ];

  nombre = '';
  readonly moneda = 'MXN · Peso mexicano';
  readonly modo = signal<ModoOperacion>('solo');
  readonly errorNombre = signal('');

  get nombreValido(): boolean {
    return this.nombre.trim().length > 0 && this.nombre.length <= 60;
  }

  seleccionarModo(id: ModoOperacion): void {
    this.modo.set(id);
  }

  onGuardar(): void {
    if (!this.nombreValido) {
      this.errorNombre.set('El campo está vacío o supera los 60 caracteres.');
      return;
    }
    this.finalizar();
  }

  onOmitir(): void {
    this.nombre = 'Mi negocio';
    this.modo.set('solo');
    this.finalizar();
  }

  private finalizar(): void {
    // Valores por defecto y sucursal implícita SUC-001 (decisión §3.2).
    try {
      localStorage.setItem(
        'sgfidm-negocio',
        JSON.stringify({
          nombre: this.nombre,
          moneda: this.moneda,
          modo: this.modo(),
          sucursalActiva: 'SUC-001',
        }),
      );
    } catch {
      // Sin almacenamiento: la navegación continúa con el estado en memoria.
    }
    this.router.navigate(['/inicio/primeros-pasos']);
  }
}
