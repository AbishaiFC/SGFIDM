import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmBadgeComponent } from '../../molecules/../atoms/badge/sgfidm-badge.component';
import { SgfidmTabsComponent } from '../../molecules/../atoms/tabs/sgfidm-tabs.component';

/**
 * DTO para una sesión de caja en el hub de cajas.
 */
export interface CajaSessionDto {
  id: string;
  sucursal: string;
  totalVenta: string;
  status: 'activa' | 'cerrada' | 'huérfana' | 'intervenida';
}

/**
 * SgfidmCajaOrganism — Organismo del Hub de Cajas (CAJ-01) del Design System SGFIDM.
 *
 * Organismo de la pantalla de Estado de cajas: lista de sesiones de caja activas/huérfanas
 * + acciones rápidas por organismo. Compone PanelCard + IndicatorCard + Badge + Tabs.
 *
 * Uso:
 *   <sgfidm-caja-organism [sessions]="sessions()" (action)="onSessionAction($event)" />
 */
@Component({
  selector: 'sgfidm-caja-organism',
  standalone: true,
  imports: [CommonModule, SgfidmPanelCardComponent, SgfidmIndicatorCardComponent, SgfidmBadgeComponent, SgfidmTabsComponent],
  templateUrl: './sgfidm-caja-organism.component.html',
  styleUrl: './sgfidm-caja-organism.component.scss',
})
export class SgfidmCajaOrganismComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  sessions = input<CajaSessionDto[]>([]);
  branchName = input<string>('Principal');

  // ── Outputs ────────────────────────────────────────────────────────────────
  sessionAction = output<{ id: string; action: 'open' | 'close' }>();

  // ── State ──────────────────────────────────────────────────────────────────
  activeTab = signal<'activas' | 'cerradas' | 'huérfanas'>('activas');

  /** Sesiones filtradas por tab activo (lógica ligera de selector). */
  get filteredSessions(): CajaSessionDto[] {
    const tab = this.activeTab();
    const statusMap: Record<string, CajaSessionDto['status']> = {
      activas: 'activa',
      cerradas: 'cerrada',
      huérfanas: 'huérfana',
    };
    return this.sessions().filter((s) => s.status === statusMap[tab]);
  }

  onTabChange(tab: string): void {
    this.activeTab.set(tab as 'activas' | 'cerradas' | 'huérfanas');
  }

  onSessionAction(id: string): void {
    const session = this.sessions().find((s) => s.id === id);
    this.sessionAction.emit({ id, action: session?.status === 'activa' ? 'close' : 'open' });
  }
}
