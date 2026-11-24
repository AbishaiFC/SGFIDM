import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconButton,
} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
// Atomos SGFIDM - accion y entrada
import { SgfidmButtonComponent } from './components/atoms/button/sgfidm-button.component';
import { SgfidmIconButtonComponent } from './components/atoms/icon-button/sgfidm-icon-button.component';
import { SgfidmTextFieldComponent } from './components/atoms/text-field/sgfidm-text-field.component';
// Atomos SGFIDM - seleccion booleana
import { SgfidmCheckboxComponent } from './components/atoms/checkbox/sgfidm-checkbox.component';
// Atomos SGFIDM - seleccion de opcion
import { SgfidmRadioComponent } from './components/atoms/radio/sgfidm-radio.component';
// Atomos SGFIDM - toggle
import { SgfidmSwitchComponent } from './components/atoms/switch/sgfidm-switch.component';
// Atomos SGFIDM - etiqueta
import { SgfidmChipComponent } from './components/atoms/chip/sgfidm-chip.component';
// Atomos SGFIDM - indicador numerico
import { SgfidmBadgeComponent } from './components/atoms/badge/sgfidm-badge.component';
// Atomos SGFIDM - identidad visual
import { SgfidmAvatarComponent } from './components/atoms/avatar/sgfidm-avatar.component';
// Atomos SGFIDM - separador visual
import { SgfidmDividerComponent } from './components/atoms/divider/sgfidm-divider.component';
// Atomos SGFIDM - navegacion por pestanas
import { SgfidmTabsComponent } from './components/atoms/tabs/sgfidm-tabs.component';
// Atomos SGFIDM - informacion contextual
import { SgfidmTooltipComponent } from './components/atoms/tooltip/sgfidm-tooltip.component';
// Atomos SGFIDM - estado de carga
import { SgfidmProgressComponent } from './components/atoms/progress/sgfidm-progress.component';
// Atomos SGFIDM - entrada de PIN
import { SgfidmPinInputComponent } from './components/atoms/pin-input/sgfidm-pin-input.component';
// Moleculas SGFIDM
import { SgfidmFormFieldComponent } from './components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmPasswordFieldComponent } from './components/molecules/password-field/sgfidm-password-field.component';
import { SgfidmPinFieldComponent } from './components/molecules/pin-field/sgfidm-pin-field.component';
import { SgfidmAuthCardComponent } from './components/molecules/auth-card/sgfidm-auth-card.component';
import { SgfidmEmptyStateComponent } from './components/molecules/empty-state/sgfidm-empty-state.component';
import { SgfidmIndicatorCardComponent } from './components/molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmPanelCardComponent } from './components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmSidebarItemComponent } from './components/molecules/sidebar-item/sgfidm-sidebar-item.component';
import { SgfidmDropdownItemComponent } from './components/molecules/dropdown-item/sgfidm-dropdown-item.component';
import { SgfidmSearchBarComponent } from './components/molecules/search-bar/sgfidm-search-bar.component';
/**
 * SharedModule: centraliza imports/exports de Angular Material y componentes propios SGFIDM.
 * Las feature modules importan SharedModule en lugar de importar Material directamente.
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    // Atomos SGFIDM - accion y entrada
    SgfidmButtonComponent,
    SgfidmIconButtonComponent,
    SgfidmTextFieldComponent,
    // Atomos SGFIDM - seleccion booleana
    SgfidmCheckboxComponent,
    // Atomos SGFIDM - seleccion de opcion
    SgfidmRadioComponent,
    // Atomos SGFIDM - toggle
    SgfidmSwitchComponent,
    // Atomos SGFIDM - etiqueta
    SgfidmChipComponent,
    // Atomos SGFIDM - indicador numerico
    SgfidmBadgeComponent,
    // Atomos SGFIDM - identidad visual
    SgfidmAvatarComponent,
    // Atomos SGFIDM - separador visual
    SgfidmDividerComponent,
    // Atomos SGFIDM - navegacion por pestanas
    SgfidmTabsComponent,
    // Atomos SGFIDM - informacion contextual
    SgfidmTooltipComponent,
    // Atomos SGFIDM - estado de carga
    SgfidmProgressComponent,
    // Atomos SGFIDM - entrada de PIN
    SgfidmPinInputComponent,
    // Moleculas SGFIDM
    SgfidmFormFieldComponent,
    SgfidmPasswordFieldComponent,
    SgfidmPinFieldComponent,
    SgfidmAuthCardComponent,
    SgfidmEmptyStateComponent,
    SgfidmIndicatorCardComponent,
    SgfidmPanelCardComponent,
    SgfidmSidebarItemComponent,
    SgfidmDropdownItemComponent,
    SgfidmSearchBarComponent,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    // Atomos SGFIDM - accion y entrada
    SgfidmButtonComponent,
    SgfidmIconButtonComponent,
    SgfidmTextFieldComponent,
    // Atomos SGFIDM - seleccion booleana
    SgfidmCheckboxComponent,
    // Atomos SGFIDM - seleccion de opcion
    SgfidmRadioComponent,
    // Atomos SGFIDM - toggle
    SgfidmSwitchComponent,
    // Atomos SGFIDM - etiqueta
    SgfidmChipComponent,
    // Atomos SGFIDM - indicador numerico
    SgfidmBadgeComponent,
    // Atomos SGFIDM - identidad visual
    SgfidmAvatarComponent,
    // Atomos SGFIDM - separador visual
    SgfidmDividerComponent,
    // Atomos SGFIDM - navegacion por pestanas
    SgfidmTabsComponent,
    // Atomos SGFIDM - informacion contextual
    SgfidmTooltipComponent,
    // Atomos SGFIDM - estado de carga
    SgfidmProgressComponent,
    // Atomos SGFIDM - entrada de PIN
    SgfidmPinInputComponent,
    // Moleculas SGFIDM
    SgfidmFormFieldComponent,
    SgfidmPasswordFieldComponent,
    SgfidmPinFieldComponent,
    SgfidmAuthCardComponent,
    SgfidmEmptyStateComponent,
    SgfidmIndicatorCardComponent,
    SgfidmPanelCardComponent,
    SgfidmSidebarItemComponent,
    SgfidmDropdownItemComponent,
    SgfidmSearchBarComponent,
  ],
})
export class SharedModule { }
