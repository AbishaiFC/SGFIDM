import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmButtonComponent } from '../../molecules/../atoms/button/sgfidm-button.component';

/**
 * DTO para un reporte disponible.
 */
export interface ReporteDto {
  id: string;
  nombre: string;
  descripcion: string;
  /** Exportaciones disponibles: XLSX, CSV. */
  exportadores?: Array<'xlsx' | 'csv'>;
}

/**
 * SgfidmReportesOrganism — Organismo de Reportes y exportaciones (Módulo 10) del Design System SGFIDM.
 *
 * Organismo de consulta/exportación: lista de reportes con exportadores rápidos.
 * Anatomía (§12): reportes acotados a sucursal activa; exportación XLSX/CSV por permiso report.export.
 *
 * Uso:
 *   <sgfidm-reportes-organism [reportes]="reportes()" (accion)="onAccion($event)" />
 */
@Component({
  selector: 'sgfidm-reportes-organism',
  standalone: true,
  imports: [CommonModule, SgfidmPanelCardComponent, SgfidmIndicatorCardComponent, SgfidmButtonComponent],
  templateUrl: './sgfidm-reportes-organism.component.html',
  styleUrl: './sgfidm-reportes-organism.component.scss',
})
export class SgfidmReportesOrganismComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  reportes = input<ReporteDto[]>([]);

  // ── Outputs ────────────────────────────────────────────────────────────────
  /** Emite el reporte seleccionado con la acción (consultar/exportar). */
  accion = output<{ reporte: ReporteDto; tipo: 'consultar' | 'exportar' | 'xlsx' | 'csv' }>();

  // ── Computed ──────────────────────────────────────────────────────────────
  /** Total de reportes. */
  get totalReportes(): string {
    return String(this.reportes().length);
  }
  /** Reportes con exportación XLSX. */
  get reportesXlsx(): ReporteDto[] {
    return this.reportes().filter((r) => (r.exportadores ?? []).includes('xlsx'));
  }
  /** String del conteo de reportes XLSX (para IndicatorCard). */
  get xlsxCount(): string {
    return String(this.reportesXlsx.length);
  }
}
