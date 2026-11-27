import { Component, input, output, signal } from '@angular/core';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { PagoConfirmado } from '../procesar-pago/procesar-pago.component';

interface LineaComprobante {
  cantidad: number;
  nombre: string;
  codigo: string;
  precio: number;
  subtotal: number;
}

/**
 * POS-04 — Comprobante de venta (overlay), modo Solo. Canon Figma 1045:143188.
 * Comprobante simple, no fiscal: sin facturación, correo ni integración fiscal.
 *
 * ToDo: impresora térmica (CONF-11), descarga real de PDF y A4 completo.
 */
@Component({
  standalone: true,
  imports: [SgfidmButtonComponent],
  selector: 'sgfidm-comprobante-venta',
  templateUrl: './comprobante-venta.component.html',
  styleUrl: './comprobante-venta.component.scss',
})
export class ComprobanteVentaComponent {
  pago = input.required<PagoConfirmado>();
  total = input.required<number>();

  readonly cerrar = output<void>();
  readonly formatos: Array<'Térmico 80 mm' | 'A4'> = ['Térmico 80 mm', 'A4'];
  readonly formato = signal<'Térmico 80 mm' | 'A4'>('Térmico 80 mm');

  readonly folio = 'VTA-1043';
  readonly fecha = '08/11/2026 · 10:42';
  readonly subtotal = 860;
  readonly descuento = 86;

  readonly lineas: LineaComprobante[] = [
    { cantidad: 2, nombre: 'Café de altura', codigo: 'PROD-018 · $180.00', precio: 180, subtotal: 360 },
    { cantidad: 1, nombre: 'Taza térmica', codigo: 'PROD-022 · $320.00', precio: 320, subtotal: 320 },
    { cantidad: 4, nombre: 'Pan artesanal', codigo: 'PROD-031 · $45.00', precio: 45, subtotal: 180 },
  ];

  monto(valor: number): string {
    return `$${valor.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  imprimir(): void {
    window.print();
  }

  descargar(): void {
    // ToDo POS-04: generar el PDF real del comprobante.
  }
}
