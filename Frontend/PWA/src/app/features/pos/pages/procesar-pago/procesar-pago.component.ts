import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

export interface PagoConfirmado {
  metodo: string;
  montoRecibido: number;
  cambio: number;
  cliente: string;
}

/**
 * POS-02 — Procesar pago (modal sobre la terminal), modo Solo (Figma 1045:147208).
 * Sin sucursal ni EMP-XXX; el cliente es texto libre opcional.
 *
 * ToDo: POS-03 confirmación, POS-04 comprobante y cálculo de cambio por denominaciones.
 */
@Component({
  standalone: true,
  imports: [FormsModule, SgfidmFormFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-procesar-pago',
  templateUrl: './procesar-pago.component.html',
  styleUrl: './procesar-pago.component.scss',
})
export class ProcesarPagoComponent {
  total = input.required<number>();
  productos = input<number>(3);
  unidades = input<number>(7);

  readonly cancelar = output<void>();
  readonly confirmar = output<PagoConfirmado>();

  readonly metodos = ['Efectivo', 'Tarjeta', 'Transferencia'];
  readonly denominaciones = [200, 500, 1000, 2000];
  readonly metodo = signal('Efectivo');
  readonly montoTexto = signal('1000');
  readonly cliente = signal('María López');
  readonly avisoVisible = signal(true);
  readonly error = signal('');

  readonly monto = computed(() => Number(this.montoTexto().replace(/,/g, '')) || 0);
  readonly cambio = computed(() => Math.max(0, this.monto() - this.total()));

  elegir(metodo: string): void {
    this.metodo.set(metodo);
    this.error.set('');
  }

  usarDenominacion(valor: number): void {
    this.montoTexto.set(String(valor));
  }

  exacto(): void {
    this.montoTexto.set(String(this.total()));
  }

  confirmarPago(): void {
    if (this.metodo() === 'Efectivo' && this.monto() < this.total()) {
      this.error.set('El monto recibido debe cubrir el total a pagar.');
      return;
    }
    this.confirmar.emit({
      metodo: this.metodo(),
      montoRecibido: this.monto(),
      cambio: this.cambio(),
      cliente: this.cliente().trim(),
    });
  }
}
