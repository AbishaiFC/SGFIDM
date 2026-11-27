import { SgfidmIconComponent } from './../../../../shared/components/atoms/icon/sgfidm-icon.component';
import { Component, OnDestroy, OnInit, input, output, signal } from '@angular/core';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { PagoConfirmado } from '../procesar-pago/procesar-pago.component';

/**
 * POS-03 — Venta registrada (modal de confirmación), modo Solo.
 * Canon Figma 1045:149650. Cierre automático a los 5 s (spec §3.8).
 *
 * ToDo: POS-04 comprobante, impresora térmica (CONF-11) y personalización del cierre.
 */
@Component({
  standalone: true,
  imports: [SgfidmIconComponent, SgfidmButtonComponent],
  selector: 'sgfidm-venta-registrada',
  templateUrl: './venta-registrada.component.html',
  styleUrl: './venta-registrada.component.scss',
})
export class VentaRegistradaComponent implements OnInit, OnDestroy {
  pago = input.required<PagoConfirmado>();
  total = input.required<number>();

  readonly cerrar = output<void>();
  readonly verComprobante = output<void>();
  readonly imprimir = output<void>();
  readonly segundos = signal(5);

  readonly folio = 'VTA-1043';

  private temporizador?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.temporizador = setInterval(() => {
      const restante = this.segundos() - 1;
      this.segundos.set(restante);
      if (restante <= 0) {
        this.detenerTemporizador();
        this.cerrar.emit();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.detenerTemporizador();
  }

  monto(valor: number): string {
    return `$${valor.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  nuevaVenta(): void {
    this.cerrar.emit();
  }

  private detenerTemporizador(): void {
    if (this.temporizador) {
      clearInterval(this.temporizador);
      this.temporizador = undefined;
    }
  }
}
