import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmWidget — Molécula de widget/tarjeta de dashboard del Design System SGFIDM.
 *
 * Container estándar para widgets de dashboard (268×150 px, radio-lg).
 * Anatomía (Figma `SGFIDM/Widget` 195:2853): "NOMBRE DEL WIDGET" eyebrow +
 * zona de cuerpo (valor principal y metadatos). Arrastrable en modo edición
 * (INICIO-08, solo Administrador según Guidelines).
 *
 * Uso:
 *   <sgfidm-widget eyebrow="VENTAS DEL MES">
 *     <div class="body">Valor principal + metadatos</div>
 *   </sgfidm-widget>
 */
@Component({
  selector: 'sgfidm-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sgfidm-widget.component.html',
  styleUrl: './sgfidm-widget.component.scss',
})
export class SgfidmWidgetComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  eyebrow = input<string>('');

  // ── Outputs ────────────────────────────────────────────────────────────────
  drag = output<void>();
}
