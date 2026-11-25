import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmEmptyStateComponent } from '../../../molecules/empty-state/sgfidm-empty-state.component';
import { SgfidmButtonComponent } from '../../../atoms/button/sgfidm-button.component';

/**
 * SgfidmP5VacioBloqueado — Patrón P5 Vacío/bloqueado del Design System SGFIDM.
 *
 * P5 "Vacío/bloqueado": Nunca vacío sin salida (T18/T39) · contacto a Administrador.
 * Compone SgfidmEmptyState + botón secundario de contacto al propietario/administrador.
 *
 * Uso:
 *   <sgfidm-p5-vacio-bloqueado
 *     [title]="'Sin movimientos'"
 *     [message]="'Aquí aparecen tus movimientos'"
 *     [actionLabel]="'Registrar movimiento'"
 *     [contactLabel]="'Contactar al Administrador'"
 *     (action)="onAction()" (contact)="onContact()" />
 */
@Component({
  selector: 'sgfidm-p5-vacio-bloqueado',
  standalone: true,
  imports: [CommonModule, SgfidmEmptyStateComponent, SgfidmButtonComponent],
  templateUrl: './sgfidm-p5-vacio-bloqueado.component.html',
  styleUrl: './sgfidm-p5-vacio-bloqueado.component.scss',
})
export class SgfidmP5VacioBloqueadoComponent {
  /** Título del estado vacío (ej. "Sin movimientos"). */
  title = input.required<string>();

  /** Mensaje explicativo. */
  message = input('');

  /** Etiqueta del botón primario (salida del vacío; vacío oculta la acción). */
  actionLabel = input<string>('');

  /** Etiqueta del botón de contacto al Administrador. */
  contactLabel = input<string>('');

  /** Emite al usar la salida principal (nunca bloqueado sin salida). */
  action = output<void>();

  /** Emite la solicitud de contacto al Administrador. */
  contact = output<void>();

  onAction(): void {
    this.action.emit();
  }

  onContact(): void {
    this.contact.emit();
  }
}
