import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmTicket — Molécula de ticket (imprimible) del Design System SGFIDM.
 *
 * Ticket de impresión para comprobante no fiscal (T17): 240×320 px.
 * Anatomía (Figma `SGFIDM/Ticket 80 mm` 195:2738): líneas de detalle proyectadas
 * + footer con TOTAL punteado + leyenda obligatoria "No válido como factura".
 *
 * Uso:
 *   <sgfidm-ticket
 *     company="FERRETERÍA EL FARO"
 *     branch="Sucursal Centro · SUC-001"
 *     folio="VTA-0282 · Hoy 13:40"
 *     total="$600.00"
 *     [marginBottom]="false"
 *   >
 *     <div class="line">LINES DE DETALLE…</div>
 *   </sgfidm-ticket>
 */
@Component({
  selector: 'sgfidm-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sgfidm-ticket.component.html',
  styleUrl: './sgfidm-ticket.component.scss',
})
export class SgfidmTicketComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  company = input<string>('');
  branch = input<string>('');
  folio = input<string>('');
  total = input.required<string>();
  /** Muestra la línea de total con puntos huecos (⋅⋅⋅) y leyenda obligatoria. */
  showFooter = input(true);

  // ── Computed ──────────────────────────────────────────────────────────────
  /** Línea visual de total: "TOTAL" + puntos huecos + importe (ver spec 195:2738). */
  totalLine = computed<string>(() => {
    const dots = '·'.repeat(20);
    return `TOTAL${dots}${this.total()}`;
  });
}
