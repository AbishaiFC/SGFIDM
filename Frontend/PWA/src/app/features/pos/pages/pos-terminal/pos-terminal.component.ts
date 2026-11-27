import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPosTerminalOrganismComponent } from '../../../../shared/components/organisms/pos-terminal/sgfidm-pos-terminal-organism.component';
import {
  ProcesarPagoComponent,
  PagoConfirmado,
} from '../procesar-pago/procesar-pago.component';

/**
 * PosTerminalPage — POS-01 + modal POS-02 (modo Solo, sucursal implícita).
 * El carrito vive en el organismo; la página solo gestiona la apertura del pago.
 */
@Component({
  standalone: true,
  imports: [SgfidmPosTerminalOrganismComponent, ProcesarPagoComponent],
  selector: 'sgfidm-pos-terminal',
  styleUrl: './pos-terminal.component.scss',
  templateUrl: './pos-terminal.component.html',
})
export class PosTerminalComponent {
  private readonly router = inject(Router);

  readonly totalPago = signal<number | null>(null);

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
    this.totalPago.set(null);
    this.router.navigate(['/pos']);
  }
}
