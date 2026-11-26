import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

interface ConfiguracionOpcion {
  titulo: string;
  descripcion: string;
  meta?: string;
  ruta?: string;
}

/**
 * ConfiguracionPage — Hub CONF-01 dentro de Dashboard.
 *
 * El prototipo Figma define este hub como punto de entrada a los módulos de
 * configuración. Las secciones con destino implementado enlazan a su vista;
 * el resto se muestra como «no disponible todavía» para evitar links muertos.
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

  readonly opciones: ConfiguracionOpcion[] = [
    {
      titulo: 'Negocio',
      descripcion: 'Nombre, moneda, modo de operación y datos de contacto.',
      meta: 'Mi negocio · Con empleados',
    },
    {
      titulo: 'Seguridad',
      descripcion: 'Contraseñas, bloqueo y sesiones activas.',
      meta: 'Políticas predeterminadas',
    },
    {
      titulo: 'Métodos de pago',
      descripcion: 'Métodos disponibles en el punto de venta.',
      meta: '3 métodos activos',
    },
    {
      titulo: 'Roles y permisos',
      descripcion: 'Permisos y roles personalizados del equipo.',
      meta: 'AUTH-06 · Destino pendiente',
    },
    {
      titulo: 'Categorías de productos',
      descripcion: 'Organiza tu catálogo por categorías.',
    },
    {
      titulo: 'Categorías financieras',
      descripcion: 'Agrupa tus ingresos y gastos.',
    },
    {
      titulo: 'Preferencias de notificaciones',
      descripcion: 'Configura qué alertas recibes y cuándo.',
    },
    {
      titulo: 'Mi perfil',
      descripcion: 'Tu cuenta, correo y teléfono vinculado.',
      meta: 'AUTH-06 · Destino pendiente',
      ruta: '/dashboard/configuracion/mi-perfil',
    },
    {
      titulo: 'Auditoría',
      descripcion: 'Historial de operaciones sensibles.',
      meta: 'Permiso: audit.view',
    },
  ];

  abrir(opcion: ConfiguracionOpcion): void {
    if (opcion.ruta) {
      this.router.navigateByUrl(opcion.ruta);
    }
  }
}
