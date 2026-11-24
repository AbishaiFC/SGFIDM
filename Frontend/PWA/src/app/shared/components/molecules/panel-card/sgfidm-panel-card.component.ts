import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmPanelCard — Molécula de panel del Design System SGFIDM.
 *
 * Contenedor estándar con encabezado fijo y cuerpo liberado (texto, listas,
 * tablas o acciones). Anatomía (Figma `SGFIDM/Panel card` 195:2710):
 * 420×150 px · radio-lg (10 px) · fill/stroke de superficie estándar.
 *
 * Uso:
 *   <sgfidm-panel-card>
 *     <ng-container>Cuerpo del panel</ng-container>
 *   </sgfidm-panel-card>
 */
@Component({
  selector: 'sgfidm-panel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sgfidm-panel-card.component.html',
  styleUrl: './sgfidm-panel-card.component.scss',
})
export class SgfidmPanelCardComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  eyebrow = input<string>('');
}
