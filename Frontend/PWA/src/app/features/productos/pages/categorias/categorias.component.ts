import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmPaginationComponent } from '../../../../shared/components/molecules/pagination/sgfidm-pagination.component';
import { SgfidmTabsComponent } from '../../../../shared/components/atoms/tabs/sgfidm-tabs.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

interface Categoria {
  codigo: string;
  nombre: string;
  descripcion: string;
  productos: number;
  archivada?: boolean;
}

/**
 * PROD-05 — Productos: Categorías (Módulo 04), modo Solo.
 * Canon Figma 1045:134800. Categorías opcionales, sin predefinidas.
 *
 * ToDo: PROD-05a crear/editar categoría, archivado/reactivación y menú de acciones.
 */
@Component({
  standalone: true,
  imports: [
    SgfidmPanelCardComponent,
    SgfidmPaginationComponent,
    SgfidmTabsComponent,
    SgfidmButtonComponent,
  ],
  selector: 'sgfidm-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss',
})
export class CategoriasComponent {
  private readonly router = inject(Router);

  readonly tabs = ['Activas', 'Archivadas'];
  readonly tab = signal('Activas');
  readonly pagina = signal(1);
  readonly aviso = signal('');

  readonly categorias: Categoria[] = [
    { codigo: 'CAT-001', nombre: 'Café y té', descripcion: 'Café, infusiones y bebidas calientes', productos: 12 },
    { codigo: 'CAT-002', nombre: 'Panadería', descripcion: 'Pan y repostería', productos: 8 },
    { codigo: 'CAT-003', nombre: 'Accesorios', descripcion: 'Artículos complementarios', productos: 3 },
    { codigo: 'CAT-004', nombre: 'Temporada', descripcion: 'Productos de temporada', productos: 0 },
  ];

  readonly visibles = () =>
    this.categorias.filter((c) => (this.tab() === 'Activas' ? !c.archivada : !!c.archivada));

  get total(): string {
    return String(this.categorias.filter((c) => !c.archivada).length);
  }

  volver(): void {
    this.router.navigate(['/productos']);
  }

  nueva(): void {
    this.aviso.set('ToDo PROD-05a: «Nueva categoría» pendiente de implementar.');
  }
}
