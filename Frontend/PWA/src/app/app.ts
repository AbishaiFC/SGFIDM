import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SgfidmSidebarComponent, SidebarEstado } from './shared/components/organisms/sidebar/sgfidm-sidebar.component';

interface ContextoNavegacion {
  rol: string;
  modo: string;
  nombreNegocio: string;
  nombreUsuario: string;
  codigoEmpleado: string;
}

@Component({
  imports: [RouterOutlet, SgfidmSidebarComponent],
  selector: 'sgfidm-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'Inko';
  private readonly router = inject(Router);

  readonly isAuthRoute = signal(false);
  readonly estadoSidebar = signal<SidebarEstado>('expanded');
  readonly contexto = signal<ContextoNavegacion>(App.leerContexto());

  constructor() {
    this.actualizar();
    this.router.events.subscribe(() => this.actualizar());
  }

  alternarSidebar(): void {
    this.estadoSidebar.update((estado) => (estado === 'expanded' ? 'icon-only' : 'expanded'));
  }

  private actualizar(): void {
    this.isAuthRoute.set(this.sinSidebar(this.router.url));
    this.contexto.set(App.leerContexto());
  }

  /**
   * Auth, la configuración inicial y el POS son flujos a pantalla completa, sin Sidebar.
   * En POS (Figma 1145:82203) la terminal ocupa todo el ancho y muestra su propia cabecera.
   */
  private sinSidebar(url: string): boolean {
    return (
      url.startsWith('/auth') || url.startsWith('/inicio/configurar') || url.startsWith('/pos')
    );
  }

  /** Rol y modo viven en la sesión y en la configuración del negocio (localStorage). */
  private static leerContexto(): ContextoNavegacion {
    try {
      const negocio = JSON.parse(localStorage.getItem('sgfidm-negocio') || '{}');
      const sesion = JSON.parse(localStorage.getItem('sgfidm-sesion') || '{}');
      const usuario = JSON.parse(localStorage.getItem('sgfidm-usuario') || '{}');
      const rol = sesion.rol || 'Administrador';
      return {
        rol,
        modo: negocio.modo || 'solo',
        nombreNegocio: negocio.nombre || 'Mi negocio',
        nombreUsuario: usuario.nombre || (rol === 'Cajero' ? 'Cajero' : 'Ana López'),
        codigoEmpleado: sesion.empleadoCodigo || 'EMP-003',
      };
    } catch {
      return {
        rol: 'Administrador',
        modo: 'solo',
        nombreNegocio: 'Mi negocio',
        nombreUsuario: 'Ana López',
        codigoEmpleado: 'EMP-003',
      };
    }
  }
}
