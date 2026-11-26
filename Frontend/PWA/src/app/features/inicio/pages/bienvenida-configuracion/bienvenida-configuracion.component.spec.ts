import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { BienvenidaConfiguracionComponent } from './bienvenida-configuracion.component';

describe('BienvenidaConfiguracionComponent (INICIO-01)', () => {
  let fixture: ComponentFixture<BienvenidaConfiguracionComponent>;
  let component: BienvenidaConfiguracionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BienvenidaConfiguracionComponent,
        RouterTestingModule.withRoutes([{ path: 'dashboard', component: BienvenidaConfiguracionComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BienvenidaConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.removeItem('sgfidm-negocio'));

  it('should create and render the Figma configuration form', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Configura tu negocio');
    expect(text).toContain('Define lo mínimo para operar.');
    expect(text).toContain('Nombre del negocio');
    expect(text).toContain('Obligatorio · máximo 60 caracteres.');
    expect(text).toContain('MXN · Peso mexicano');
    expect(text).toContain('Modo de operación');
    expect(text).toContain('Trabajo solo');
    expect(text).toContain('Tengo empleados');
    expect(text).toContain('Tengo sucursales');
    expect(text).toContain('Omitir por ahora');
    expect(text).toContain('Guardar y continuar');
  });

  it('should reject an empty business name', () => {
    component.onGuardar();
    expect(component.errorNombre()).toContain('vacío o supera los 60 caracteres');
    expect(component.nombreValido).toBe(false);
  });

  it('should save the business with the selected mode and implicit SUC-001', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.nombre = 'Café Aurora';
    component.seleccionarModo('empleados');
    component.onGuardar();

    expect(spy).toHaveBeenCalledWith(['/dashboard']);
    const guardado = JSON.parse(localStorage.getItem('sgfidm-negocio') || '{}');
    expect(guardado.nombre).toBe('Café Aurora');
    expect(guardado.modo).toBe('empleados');
    expect(guardado.sucursalActiva).toBe('SUC-001');
    spy.mockRestore();
  });

  it('should apply defaults when skipping the configuration', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onOmitir();

    const guardado = JSON.parse(localStorage.getItem('sgfidm-negocio') || '{}');
    expect(guardado.nombre).toBe('Mi negocio');
    expect(guardado.modo).toBe('solo');
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
    spy.mockRestore();
  });
});
