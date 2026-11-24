import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmAuthCard — Molecula contenedor de formularios de autenticacion.
 *
 * Superficie elevada centrada con logo del negocio (placeholder), titulo
 * de pantalla, subtitulo opcional y slot de contenido via ng-content.
 * Cubre AUTH-01, AUTH-02 a AUTH-12 y la suite de pantallas de empleado.
 *
 * Uso:
 *   <sgfidm-auth-card title="Iniciar sesión" subtitle="Accede a tu cuenta">
 *     <sgfidm-form-field ... />
 *     <sgfidm-button ... />
 *   </sgfidm-auth-card>
 */
@Component({
  selector: 'sgfidm-auth-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sgfidm-auth-card.component.html',
  styleUrl: './sgfidm-auth-card.component.scss',
})
export class SgfidmAuthCardComponent {
  title     = input.required<string>();
  subtitle  = input<string>('');
  showLogo  = input<boolean>(true);
  logoText  = input<string>('SGFIDM');
}
