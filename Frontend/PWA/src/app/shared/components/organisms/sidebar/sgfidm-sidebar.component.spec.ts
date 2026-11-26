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
