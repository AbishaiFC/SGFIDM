import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from './shared/shared.module';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SharedModule],
  selector: 'sgfidm-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'Inko';
  private readonly router = inject(Router);
  readonly isAuthRoute = signal(false);

  constructor() {
    this.isAuthRoute.set(this.sinSidebar(this.router.url));
    this.router.events.subscribe(() => {
      this.isAuthRoute.set(this.sinSidebar(this.router.url));
    });
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
}
