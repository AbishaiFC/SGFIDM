import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmSidebarItem — Molécula de item de navegación lateral del DS SGFIDM.
 *
 * Canon actualizado (Ficha Sidebar 366:15636 / SGFIDM/SidebarItem 621:xxxx):
 * 38 px de alto, icono 18 px, gap 10 px, radio 6 px. Estado selected =
 * píldora oscura (#2a2a2a) con texto/icono claros. Layout Expanded | Icon-only.
 */
@Component({
  selector: 'sgfidm-sidebar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sgfidm-sidebar-item.component.html',
  styleUrl: './sgfidm-sidebar-item.component.scss',
})
export class SgfidmSidebarItemComponent {
  variant = input<'default' | 'active' | 'disabled'>('default');
  layout = input<'expanded' | 'icon-only'>('expanded');
  icon = input.required<string>();
  label = input.required<string>();
  route = input<string>('');

  nav = output<string | undefined>();

  onClick(): void {
    if (this.variant() !== 'disabled') {
      this.nav.emit(this.route());
    }
  }
}
