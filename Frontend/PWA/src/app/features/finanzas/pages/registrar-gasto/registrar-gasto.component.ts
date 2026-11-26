import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

interface Gasto {
  codigo: string;
  monto: number;
  concepto: string;
  descripcion?: string;
  categoria?: string;
  metodo: string;
  referencia?: string;
  vinculadoCaja: boolean;
  fechaCreacion: string;
}

/**
 * FIN-08 — Finanzas: Registrar gasto (Módulo 08), drawer en modo Solo
 * (Figma 1145:85135). Se muestra sobre el listado de Gastos (FIN-03, ToDo).
 *
 * El shell del drawer y el control segmentado de método se construyen con
 * tokens SGFIDM: el DS no tiene molécula de drawer ni de segmented control
 * (sgfidm-dialog es solo confirm/destructive).
 */
@Component({
  standalone: true,
  imports: [FormsModule, SgfidmPanelCardComponent, SgfidmFormFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-registrar-gasto',
  styleUrl: './registrar-gasto.component.scss',
  templateUrl: './registrar-gasto.component.html',
})
export class RegistrarGastoComponent {
  private readonly router = inject(Router);

  readonly codigo = signal('GAS-00049');
  readonly monto = signal('650.00');
  readonly concepto = signal('Compra urgente de leche entera y café de grano para barra');
  readonly descripcion = signal(
    'Surtido de emergencia en tienda local por agotamiento de insumos turno de la tarde.',
  );
  readonly categoria = signal('Insumos y materia prima (CATF-001)');
  readonly metodo = signal('Efectivo');
  readonly referencia = signal('Ticket OXXO #44921 / Don Pedro Café');

  readonly negocio = 'Mi negocio';
  readonly registrador = 'Ana Martínez';
  readonly metodos = ['Efectivo', 'Tarjeta', 'Transferencia', 'Otro'];
  readonly maxConcepto = 120;
  readonly maxDescripcion = 500;
  readonly error = signal('');

  readonly cajaAbierta = RegistrarGastoComponent.leerCajaAbierta();
  readonly sinCaja = computed(() => this.metodo() === 'Efectivo' && !this.cajaAbierta);

  get descripcionLength(): number {
    return this.descripcion().length;
  }

  onRegistrar(): void {
    const monto = Number(this.monto().replace(/,/g, ''));
    if (!Number.isFinite(monto) || monto <= 0) {
      this.error.set('El monto debe ser mayor a cero.');
      return;
    }
    const concepto = this.concepto().trim();
    if (!concepto) {
      this.error.set('El concepto es obligatorio.');
      return;
    }
    if (concepto.length > this.maxConcepto) {
      this.error.set(`El concepto no puede superar los ${this.maxConcepto} caracteres.`);
      return;
    }
    if (!this.metodo()) {
      this.error.set('Selecciona un método de pago.');
      return;
    }

    const gasto: Gasto = {
      codigo: this.codigo(),
      monto,
      concepto,
      descripcion: this.descripcion().trim() || undefined,
      categoria: this.categoria() === 'Sin categoría' ? undefined : this.categoria(),
      metodo: this.metodo(),
      referencia: this.referencia().trim() || undefined,
      vinculadoCaja: this.metodo() === 'Efectivo' && this.cajaAbierta,
      fechaCreacion: new Date().toISOString(),
    };

    try {
      const existentes: Gasto[] = JSON.parse(localStorage.getItem('sgfidm-gastos') || '[]');
      localStorage.setItem('sgfidm-gastos', JSON.stringify([...existentes, gasto]));
      // INICIO-02: el primer gasto completa el ítem del checklist.
      localStorage.setItem('sgfidm-primer-gasto', 'true');
    } catch {
      // Sin almacenamiento: el drawer conserva los valores en memoria.
    }
    this.cerrar();
  }

  cerrar(): void {
    this.router.navigate(['/dashboard']);
  }

  private static leerCajaAbierta(): boolean {
    try {
      return !!localStorage.getItem('sgfidm-caja-abierta');
    } catch {
      return false;
    }
  }
}
