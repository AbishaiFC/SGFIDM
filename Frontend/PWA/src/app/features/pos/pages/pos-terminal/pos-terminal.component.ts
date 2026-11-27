import { Component, signal } from '@angular/core';
import { SgfidmPosTerminalOrganismComponent } from '../../../../shared/components/organisms/pos-terminal/sgfidm-pos-terminal-organism.component';
import {
  ProcesarPagoComponent,
  PagoConfirmado,
} from '../procesar-pago/procesar-pago.component';
import { VentaRegistradaComponent } from '../venta-registrada/venta-registrada.component';

/**
 * PosTerminalPage — POS-01 + modal POS-02 (modo Solo, sucursal implícita).
 * El carrito vive en el organismo; la página solo gestiona la apertura del pago.
 */
@Component({
  standalone: true,
  imports: [SgfidmPosTerminalOrganismComponent, ProcesarPagoComponent, VentaRegistradaComponent],
  selector: 'sgfidm-pos-terminal',
  styleUrl: './pos-terminal.component.scss',
  templateUrl: './pos-terminal.component.html',
})
export class PosTerminalComponent {
  readonly totalPago = signal<number | null>(null);
  readonly ventaConfirmada = signal<PagoConfirmado | null>(null);
  readonly totalVenta = signal(0);

  abrirPago(total: number): void {
    this.totalPago.set(total);
  }

  cancelarPago(): void {
    this.totalPago.set(null);
  }

  confirmarPago(pago: PagoConfirmado): void {
    try {
      localStorage.setItem('sgfidm-ultima-venta', JSON.stringify(pago));
    } catch {
      // Sin almacenamiento: la venta queda solo en memoria.
    }
    this.totalVenta.set(this.totalPago() ?? 0);
    this.totalPago.set(null);
    this.ventaConfirmada.set(pago);
  }

  cerrarVenta(): void {
    this.ventaConfirmada.set(null);
  }

  verComprobante(): void {
    // ToDo POS-04: abrir el comprobante de la venta.
  }
}
