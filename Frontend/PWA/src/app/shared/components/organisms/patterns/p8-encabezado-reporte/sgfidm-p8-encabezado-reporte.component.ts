import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmButtonComponent } from '../../../atoms/button/sgfidm-button.component';

/** DTO de un filtro del encabezado de reporte (P8). */
export interface P8FilterDto {
  key: string;
  label: string;
  value: string;
}

/**
 * SgfidmP8EncabezadoReporte — Patrón P8 Encabezado de reporte (T20) del Design System SGFIDM.
 *
 * T20 Encabezado de reporte: Periodo · sucursal · filtros · fecha/hora · usuario · moneda
 * — visible y exportado.
 *
 * Uso:
 *   <sgfidm-p8-encabezado-reporte
 *     title="Historial de movimientos"
 *     periodo="2026-11-01 a 2026-11-24"
 *     sucursal="Principal"
 *     [filters]="filters"
 *     usuario="AbishaiFC"
 *     moneda="MXN"
 *     (export)="onExport()"
 *   />
 */
@Component({
  selector: 'sgfidm-p8-encabezado-reporte',
  standalone: true,
  imports: [CommonModule, SgfidmButtonComponent],
  templateUrl: './sgfidm-p8-encabezado-reporte.component.html',
  styleUrl: './sgfidm-p8-encabezado-reporte.component.scss',
})
export class SgfidmP8EncabezadoReporteComponent {
  /** Título del reporte. */
  title = input.required<string>();

  /** Filtro de periodo del reporte. */
  periodo = input('');

  /** Filtro de sucursal del reporte. */
  sucursal = input('');

  /** Filtros adicionales (listado de pares clave-etiqueta). */
  filters = input<P8FilterDto[]>([]);

  /** Usuario generador del reporte. */
  usuario = input('');

  /** Moneda del reporte. */
  moneda = input('');

  /** Emite al exportar el reporte (encabezado visible y exportado). */
  export = output<void>();

  onExport(): void {
    this.export.emit();
  }
}
