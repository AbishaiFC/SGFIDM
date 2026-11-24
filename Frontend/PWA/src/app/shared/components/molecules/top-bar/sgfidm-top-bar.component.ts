import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmSearchBarComponent } from '../search-bar/sgfidm-search-bar.component';

/**
 * SgfidmTopBar — Molécula de barra superior del Design System SGFIDM.
 *
 * Barra de navegación superior (1112×64 px, fill surface #FFFFFF, sin sombra).
 * Anatomía (Figma `SGFIDM/Top bar` 195:2863): migas "SGFIDM / Módulo / Vista"
 * (#575757 text-secondary / #8B8B8B text-muted) + campo "Buscar…".
 *
 * Uso:
 *   <sgfidm-top-bar breadcrumbs="['SGFIDM', 'POS', 'Terminal']" [showSearch]="false" />
 */
@Component({
  selector: 'sgfidm-top-bar',
  standalone: true,
  imports: [CommonModule, SgfidmSearchBarComponent],
  templateUrl: './sgfidm-top-bar.component.html',
  styleUrl: './sgfidm-top-bar.component.scss',
})
export class SgfidmTopBarComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  /** Migas de navegación, separadas por "/". Por defecto: ['SGFIDM']. */
  breadcrumbs = input<string[]>(['SGFIDM']);
  /** Buscador habilitado (por defecto true). */
  showSearch = input(true);
  /** Texto del campo de búsqueda (por defecto "Buscar…"). */
  searchPlaceholder = input('Buscar…');
}
