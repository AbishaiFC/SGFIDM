import { Component, computed, input, model, output } from '@angular/core';

/**
 * SgfidmTabs — Átomo de pestañas.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * Variantes (según Design System SGFIDM §04.1.7):
 *   State: inactive | active
 *   90×44px, indicador 58×2px fill text-primary
 *   Etiqueta inactiva: text-muted, activa: text-primary
 *
 * Tokens: --sgfidm-color-text-primary, --sgfidm-color-text-muted,
 *         --sgfidm-space-1 (itemSpacing)
 */
@Component({
  standalone: true,
  selector: 'sgfidm-tabs',
  imports: [],
  templateUrl: './sgfidm-tabs.component.html',
  styleUrl: './sgfidm-tabs.component.scss',
})
export class SgfidmTabsComponent {
  readonly activeTab = model<string>('');
  readonly tabs = input<string[]>([]);
  readonly tabClick = output<string>();

  readonly isActive = (tabId: string) => this.activeTab() === tabId;

  readonly activeTabIndex = computed(() => this.tabs().indexOf(this.activeTab()));

  selectTab(tabId: string): void {
    this.activeTab.set(tabId);
    this.tabClick.emit(tabId);
  }
}
