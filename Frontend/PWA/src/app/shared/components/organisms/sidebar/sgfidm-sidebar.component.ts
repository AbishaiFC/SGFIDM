import { Component, computed, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { SgfidmSidebarItemComponent } from '../../molecules/sidebar-item/sgfidm-sidebar-item.component';
import { SgfidmIconButtonComponent } from '../../atoms/icon-button/sgfidm-icon-button.component';

export type SidebarRol = 'Empleado' | 'Almacenista' | 'Supervisor' | 'Administrador';
export type SidebarModo = 'solo' | 'empleados' | 'sucursales';
export type SidebarEstado = 'expanded' | 'icon-only';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  grupo: number;
}

/**
 * SgfidmSidebar — Organismo de navegación lateral del backoffice (Ficha 366:15636).
 *
 * Canónico: 248 px expandida / 80 px icon-only · INKO + nombre del negocio ·
 * tres grupos separados por divisores · pie con avatar, rol y notificaciones.
 * Los ítems son el molécula SgfidmSidebarItemComponent.
 *
 * Visibilidad: la definen el ROL (cuatro roles de la ficha) y el MODO de operación
 * (solo | empleados | sucursales). En modo Solo se ocultan Sucursales y Empleados.
 *
 * ToDo: rutas de Inventario, Reportes, Finanzas y Empleados cuando se implementen
 * sus pantallas (INV-01, REP-01, FIN-01, EMP-01).
 */
@Component({
  selector: 'sgfidm-sidebar',
  standalone: true,
  imports: [SgfidmSidebarItemComponent, SgfidmIconButtonComponent],
  templateUrl: './sgfidm-sidebar.component.html',
  styleUrl: './sgfidm-sidebar.component.scss',
  host: {
    '[class.sgfidm-sidebar--icono]': "estado() === 'icon-only'",
    '[style.width.px]': "estado() === 'icon-only' ? 80 : 248",
  },
})
export class SgfidmSidebarComponent {
  private readonly router = inject(Router);

  rol = input<SidebarRol | string>('Administrador');
  modo = input<SidebarModo | string>('solo');
  nombreNegocio = input('Mi negocio');
  nombreUsuario = input('Ana López');
  codigoEmpleado = input('EMP-003');
  estado = input<SidebarEstado>('expanded');
  notificaciones = input(7);

  readonly alternar = output<void>();
  readonly url = signal(this.router.url);

  private readonly items: NavItem[] = [
    { id: 'inicio', label: 'Inicio', icon: 'home', route: '/dashboard', grupo: 1 },
    // ToDo PROD-01: apuntar al catálogo cuando esté implementado.
    { id: 'productos', label: 'Productos', icon: 'shopping_bag', route: '/productos/registrar', grupo: 1 },
    // ToDo INV-01: inventario general.
    { id: 'inventario', label: 'Inventario', icon: 'inventory_2', route: '', grupo: 1 },
    { id: 'pos', label: 'POS', icon: 'point_of_sale', route: '/pos', grupo: 1 },
    { id: 'caja', label: 'Caja', icon: 'payments', route: '/caja', grupo: 1 },
    // ToDo REP-01 y FIN-01: pantallas de reportes y finanzas.
    { id: 'reportes', label: 'Reportes', icon: 'bar_chart', route: '', grupo: 2 },
    { id: 'finanzas', label: 'Finanzas', icon: 'attach_money', route: '', grupo: 2 },
    { id: 'sucursales', label: 'Sucursales', icon: 'storefront', route: '/dashboard/select-branch', grupo: 3 },
    // ToDo EMP-01: gestión de empleados.
    { id: 'empleados', label: 'Empleados', icon: 'groups', route: '', grupo: 3 },
    { id: 'configuracion', label: 'Configuración', icon: 'settings', route: '/dashboard/configuracion', grupo: 3 },
  ];

  /** Visibilidad por rol según la ficha de Figma (28 variantes). */
  private readonly porRol: Record<string, string[]> = {
    Empleado: ['inicio', 'productos', 'inventario', 'pos', 'caja'],
    Almacenista: ['inicio', 'productos', 'inventario'],
    Supervisor: ['inicio', 'productos', 'inventario', 'pos', 'caja', 'reportes', 'finanzas'],
    Administrador: this.items.map((i) => i.id),
  };

  /** Visibilidad por modo: Solo no tiene empleados ni sucursales. */
  private readonly ocultosPorModo: Record<string, string[]> = {
    solo: ['sucursales', 'empleados'],
    empleados: ['sucursales'],
    sucursales: [],
  };

  readonly visibles = computed(() => {
    const permitidos = this.porRol[this.rol()] ?? this.porRol['Empleado'];
    const ocultos = this.ocultosPorModo[this.modo()] ?? [];
    return this.items.filter((i) => permitidos.includes(i.id) && !ocultos.includes(i.id));
  });

  readonly grupos = computed(() => {
    const visibles = this.visibles();
    return [1, 2, 3]
      .map((numero) => ({ numero, items: visibles.filter((i) => i.grupo === numero) }))
      .filter((grupo) => grupo.items.length > 0)
      .map((grupo, indice) => ({ ...grupo, divisor: indice > 0 }));
  });

  readonly layout = computed<SidebarEstado>(() => this.estado());
  readonly iniciales = computed(() =>
    this.nombreUsuario()
      .split(' ')
      .map((parte) => parte[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  );
  readonly rolMostrado = computed(() => {
    const rol = this.rol();
    return rol === 'Empleado' ? 'Empleado' : rol;
  });

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(() => this.url.set(this.router.url));
  }

  activo(item: NavItem): boolean {
    if (!item.route) return false;
    const url = this.url();
    if (item.route === '/dashboard') {
      return url === '/dashboard' || url.startsWith('/inicio');
    }
    return url === item.route || url.startsWith(`${item.route}/`);
  }

  navegar(route: string | undefined): void {
    // ToDo: las secciones sin pantalla implementada no navegan todavía.
    if (route) {
      this.router.navigate([route]);
    }
  }
}
