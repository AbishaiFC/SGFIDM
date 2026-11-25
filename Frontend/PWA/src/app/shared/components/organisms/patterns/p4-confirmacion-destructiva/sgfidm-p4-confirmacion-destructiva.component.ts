import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmDialogComponent } from '../../../molecules/dialog/sgfidm-dialog.component';

/**
 * SgfidmP4ConfirmacionDestructiva — Patrón P4 Confirmación destructiva del Design System SGFIDM.
 *
 * P4 "Confirmación destructiva": Fondo ink-900 @40 % · primaria destructiva · una · Cancelar enfocado.
 *
 * Componente wrapper sobre SgfidmDialog (variant="destructive").
 *
 * Uso:
 *   <sgfidm-p4-confirmacion-destructiva
 *     [title]="'¿Eliminar producto?'"
 *     [message]="'Se eliminará permanentemente'"
 *     [confirmLabel]="'Eliminar'"
 *     (confirm)="onConfirm()" />
 */
@Component({
  selector: 'sgfidm-p4-confirmacion-destructiva',
  standalone: true,
  imports: [CommonModule, SgfidmDialogComponent],
  templateUrl: './sgfidm-p4-confirmacion-destructiva.component.html',
  styleUrl: './sgfidm-p4-confirmacion-destructiva.component.scss',
})
export class SgfidmP4ConfirmacionDestructivaComponent {
  /** Título de la confirmación. */
  title = input.required<string>();

  /** Mensaje explicativo. */
  message = input('');

  /** Etiqueta del botón confirmativo (default del dialog: "Eliminar"). */
  confirmLabel = input<string>('');

  /** Emite cuando el usuario confirma la acción destructiva. */
  confirm = output<void>();

  onConfirm(): void {
    this.confirm.emit();
  }
}
