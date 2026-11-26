import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { SgfidmSidebarComponent } from './sgfidm-sidebar.component';

describe('SgfidmSidebarComponent (Ficha 366:15636)', () => {
  let fixture: ComponentFixture<SgfidmSidebarComponent>;
  let component: SgfidmSidebarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmSidebarComponent],
      providers: [
        provideRouter([
          { path: 'dashboard', component: SgfidmSidebarComponent },
          { path: 'caja', component: SgfidmSidebarComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const etiquetas = (): string[] =>
    Array.from(
      fixture.debugElement.nativeElement.querySelectorAll('.sgfidm-sidebar-item__label'),
    ).map((n) => (n as HTMLElement).textContent?.trim() ?? '');

  it('should render the canonical brand, groups and footer', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('INKO');
    expect(text).toContain('Mi negocio');
    expect(text).toContain('Ana López');
    expect(text).toContain('Administrador · EMP-003');
    expect(fixture.debugElement.nativeElement.querySelectorAll('.sidebar-nav')).toHaveLength(1);
    expect(fixture.debugElement.nativeElement.querySelectorAll('[role="separator"]')).toHaveLength(2);
  });

  it('should use the Inko(Light) SVG brand and place the collapse button in the header', () => {
    const raiz = fixture.debugElement.nativeElement as HTMLElement;
    const logo = raiz.querySelector('img.sgfidm-sidebar__logo');
    expect(logo?.getAttribute('src')).toBe('Inko(Light).svg');
    expect(raiz.querySelector('.sgfidm-sidebar__colapsar')).toBeTruthy();
    expect(raiz.querySelector('.sgfidm-sidebar__pie .sgfidm-sidebar__colapsar')).toBeNull();
    expect(raiz.querySelector('.sgfidm-sidebar__colapsar .material-symbols-outlined')?.textContent).toContain('right_panel_close');
  });

  it('should hide the panel icon and use the logo as the toggle when collapsed', () => {
    let emitido = false;
    component.alternar.subscribe(() => (emitido = true));
    fixture.componentRef.setInput('estado', 'icon-only');
    fixture.detectChanges();
    const raiz = fixture.debugElement.nativeElement as HTMLElement;
    expect(raiz.querySelector('.sgfidm-sidebar__colapsar')).toBeNull();
    const logoBoton = raiz.querySelector('.sgfidm-sidebar__logo-toggle') as HTMLButtonElement;
    expect(logoBoton?.getAttribute('aria-label')).toBe('Abrir panel de navegación');
    expect(logoBoton?.querySelector('img')?.getAttribute('src')).toBe('Inko(Light).svg');
    logoBoton.click();
    expect(emitido).toBe(true);
  });

  it('should keep the footer inline when expanded and stack it only when collapsed', () => {
    const pie = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      '.sgfidm-sidebar__pie',
    );
    expect(pie?.classList.contains('sgfidm-sidebar__pie--icono')).toBe(false);
    fixture.componentRef.setInput('estado', 'icon-only');
    fixture.detectChanges();
    expect(pie?.classList.contains('sgfidm-sidebar__pie--icono')).toBe(true);
  });

  it('should expose a logout button that emits cerrarSesion', () => {
    let emitido = false;
    component.cerrarSesion.subscribe(() => (emitido = true));
    const raiz = fixture.debugElement.nativeElement as HTMLElement;
    expect(raiz.querySelector('.sgfidm-sidebar__salir')?.getAttribute('aria-label')).toBe('Cerrar sesión');
    (raiz.querySelector('.sgfidm-sidebar__salir button') as HTMLButtonElement).click();
    expect(emitido).toBe(true);
  });

  it('should hide Sucursales and Empleados in Solo mode', () => {
    expect(etiquetas()).toEqual([
      'Inicio',
      'Productos',
      'Inventario',
      'POS',
      'Caja',
      'Reportes',
      'Finanzas',
      'Configuración',
    ]);
  });

  it('should show Empleados but not Sucursales in Empleados mode', () => {
    fixture.componentRef.setInput('modo', 'empleados');
    fixture.detectChanges();
    expect(etiquetas()).toContain('Empleados');
    expect(etiquetas()).not.toContain('Sucursales');
  });

  it('should show Sucursales and Empleados in Sucursales mode', () => {
    fixture.componentRef.setInput('modo', 'sucursales');
    fixture.detectChanges();
    expect(etiquetas()).toContain('Sucursales');
    expect(etiquetas()).toContain('Empleados');
  });

  it('should show only the operational group for Empleado', () => {
    fixture.componentRef.setInput('rol', 'Empleado');
    fixture.detectChanges();
    expect(etiquetas()).toEqual(['Inicio', 'Productos', 'Inventario', 'POS', 'Caja']);
    expect(fixture.debugElement.nativeElement.querySelectorAll('[role="separator"]')).toHaveLength(0);
  });

  it('should show only three items for Almacenista', () => {
    fixture.componentRef.setInput('rol', 'Almacenista');
    fixture.detectChanges();
    expect(etiquetas()).toEqual(['Inicio', 'Productos', 'Inventario']);
  });

  it('should show analysis items and one divider for Supervisor', () => {
    fixture.componentRef.setInput('rol', 'Supervisor');
    fixture.detectChanges();
    expect(etiquetas()).toEqual([
      'Inicio',
      'Productos',
      'Inventario',
      'POS',
      'Caja',
      'Reportes',
      'Finanzas',
    ]);
    expect(fixture.debugElement.nativeElement.querySelectorAll('[role="separator"]')).toHaveLength(1);
  });

  it('should collapse to icon-only without labels', () => {
    fixture.componentRef.setInput('estado', 'icon-only');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.sgfidm-sidebar-item__label')).toBeNull();
    expect(fixture.nativeElement.classList.contains('sgfidm-sidebar--icono')).toBe(true);
  });

  it('should mark Inicio as current on /dashboard', async () => {
    await TestBed.inject(Router).navigateByUrl('/dashboard');
    fixture.detectChanges();
    const activos = fixture.debugElement.nativeElement.querySelectorAll('[aria-current="page"]');
    expect(activos).toHaveLength(1);
    expect(activos[0].textContent).toContain('Inicio');
  });
});
