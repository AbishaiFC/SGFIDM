import { SgfidmIconComponent } from './../../atoms/icon/sgfidm-icon.component';
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmDialog — Molécula de diálogo del Design System SGFIDM.
 *
 * COMPONENT_SET 195:2761 con 2 variantes: confirm y destructive.
 * Anatomía (Figma): círculo-icono, título, cuerpo, acciones (Cancelar + Confirmar/Eliminar).
 * Decisión impresa: "Dialog: siempre con acción secundaria clara y foco inicial
 * en Cancelar en destructivos." (No aplica elevation/dialog — fills/strokes planos.)
 *
 * Uso:
 *   <sgfidm-dialog variant="confirm"
 *     title="¿Confirmar acción?"
 *     message="Esta operación se registrará en el historial…"
 *     confirmLabel="Confirmar"
 *     (confirm)="onConfirm()" (cancel)="onCancel()" />
 */
@Component({
  selector: 'sgfidm-dialog',
  standalone: true,
  imports: [SgfidmIconComponent, CommonModule],
  templateUrl: './sgfidm-dialog.component.html',
  styleUrl: './sgfidm-dialog.component.scss',
})
export class SgfidmDialogComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  variant = input<'confirm' | 'destructive'>('confirm');
  title = input.required<string>();
  message = input('');
  confirmLabel = input<string | null>(null);
  cancelLabel = input<string | null>(null);
  showCancel = input(true);

  // ── Outputs ────────────────────────────────────────────────────────────────
  confirm = output<void>();
  cancel = output<void>();
}
