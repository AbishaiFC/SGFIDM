import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmButtonComponent } from '../../atoms/button/sgfidm-button.component';

/**
 * SgfidmEmptyState — Molecula de estado vacío del Design System SGFIDM.
 *
 * Combina icono, título, mensaje y una acción primaria. Nunca se muestra un
 * vacío sin salida: siempre incluye una acción primaria (regla T18 de Guidelines).
 * Cubre pantallas de listado vacío, dashboard sin datos, búsquedas sin resultados.
 *
 * Uso:
 *   <sgfidm-empty-state
 *     icon="folder_off"
 *     title="Sin datos todavía"
 *     message="Cuando registres el primer movimiento aparecerá aquí."
 *     (action)="onNuevo()"
 *     actionLabel="Registrar movimiento"
 *   />
 */
@Component({
  selector: 'sgfidm-empty-state',
  standalone: true,
  imports: [CommonModule, SgfidmButtonComponent],
  templateUrl: './sgfidm-empty-state.component.html',
  styleUrl: './sgfidm-empty-state.component.scss',
})
export class SgfidmEmptyStateComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  icon = input<string>('folder_off');
  title = input.required<string>();
  message = input<string>('');
  actionLabel = input<string>('');

  // ── Outputs ────────────────────────────────────────────────────────────────
  action = output<void>();
}
