import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmFinanzasOrganismComponent } from '../../../../shared/components/organisms/finanzas/sgfidm-finanzas-organism.component';

/**
 * FIN-01 — Finanzas: Resumen financiero (Módulo 08), modo Solo.
 * Compone el organismo canónico del DS con las acciones disponibles.
 *
 * ToDo: FIN-02..07 (ingresos, gastos, movimientos, análisis, categorías,
 * registrar ingreso manual) y vinculación retroactiva de gastos no vinculados.
 */
@Component({
  standalone: true,
  imports: [SgfidmFinanzasOrganismComponent],
  selector: 'sgfidm-resumen-financiero',
  template: `
    <sgfidm-finanzas-organism
      (verMovimientos)="pendiente('FIN-05', 'Movimientos financieros')"
      (registrarGasto)="registrarGasto()"
      (registrarIngreso)="pendiente('FIN-07', 'Registrar ingreso manual')"
      (analisis)="pendiente('FIN-06', 'Análisis de rentabilidad')"
      (categoriasFinancieras)="pendiente('FIN-04', 'Categorías financieras')"
      (gestionarCategorias)="pendiente('FIN-04', 'Categorías financieras')"
    />
    @if (aviso()) {
      <p class="resumen-financiero__aviso" role="status">{{ aviso() }}</p>
    }
  `,
  styles: `
    .resumen-financiero__aviso {
      margin: 12px 0 0;
      font-size: 11px;
      color: var(--sgfidm-color-warning, #9a6b14);
      font-family: var(--sgfidm-font-family);
    }
  `,
})
export class ResumenFinancieroComponent {
  private readonly router = inject(Router);

  readonly aviso = signal('');

  registrarGasto(): void {
    this.aviso.set('');
    this.router.navigate(['/finanzas/gastos/registrar']);
  }

  pendiente(id: string, nombre: string): void {
    this.aviso.set(`ToDo ${id}: «${nombre}» pendiente de implementar.`);
  }
}
