import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

interface ConfiguracionOpcion {
  id: string;
  titulo: string;
  descripcion: string;
  meta?: string;
  ruta?: string;
}

/**
 * CONF-01 — Configuración (hub), canon Figma 1145:86760 en modo Solo.
 *
 * Las ocho filas del prototipo se conservan. Solo "Mi perfil" (AUTH-06) tiene
 * destino implementado; el resto queda como ToDo con aviso en pantalla para
 * no crear enlaces muertos.
 *
 * OTROS MODOS (ToDo): CONF-02..09, PROD-05, FIN-04, NOT-03, CONF-05/06.
 */
@Component({
  standalone: true,
  imports: [SgfidmPanelCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-configuracion',
  styleUrl: './configuracion.component.scss',
  templateUrl: './configuracion.component.html',
})
export class ConfiguracionComponent {
  private readonly router = inject(Router);

  readonly aviso = signal('');

  readonly opciones: ConfiguracionOpcion[] = [
    {
      id: 'CONF-02',
      titulo: 'Negocio',
      descripcion: 'Nombre, moneda, modo de operación y datos de contacto.',
      meta: 'Mi negocio · Con empleados',
      ruta: '/inicio/configurar',
    },
    {
      id: 'CONF-04',
      titulo: 'Seguridad',
      descripcion: 'Contraseñas, bloqueo y sesiones activas.',
      meta: 'Políticas predeterminadas',
    },
    {
      id: 'CONF-03',
      titulo: 'Métodos de pago',
      descripcion: 'Métodos disponibles en el punto de venta.',
      meta: '3 métodos activos',
    },
    {
      id: 'PROD-05',
      titulo: 'Categorías de productos',
      descripcion: 'Organiza tu catálogo por categorías.',
      ruta: '/productos/categorias',
    },
    {
      id: 'FIN-04',
      titulo: 'Categorías financieras',
      descripcion: 'Agrupa tus ingresos y gastos.',
    },
    {
      id: 'NOT-03',
      titulo: 'Preferencias de notificaciones',
      descripcion: 'Configura qué alertas recibes y cuándo.',
    },
    {
      id: 'AUTH-06',
      titulo: 'Mi perfil',
      descripcion: 'Tu cuenta, correo y teléfono vinculado.',
      meta: 'AUTH-06 · Destino pendiente',
      ruta: '/dashboard/configuracion/mi-perfil',
    },
    {
      id: 'CONF-05',
      titulo: 'Auditoría',
      descripcion: 'Historial de operaciones sensibles.',
      meta: 'Permiso: audit.view',
    },
  ];

  abrir(opcion: ConfiguracionOpcion): void {
    if (opcion.ruta) {
      this.aviso.set('');
      this.router.navigateByUrl(opcion.ruta);
      return;
    }
    this.aviso.set(`ToDo ${opcion.id}: «${opcion.titulo}» pendiente de implementar.`);
  }
}
