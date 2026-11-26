import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { PrimerosPasosComponent } from './primeros-pasos.component';

describe('PrimerosPasosComponent (INICIO-02)', () => {
  let fixture: ComponentFixture<PrimerosPasosComponent>;
  let component: PrimerosPasosComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PrimerosPasosComponent,
        RouterTestingModule.withRoutes([
          { path: 'caja', component: PrimerosPasosComponent },
          { path: 'pos', component: PrimerosPasosComponent },
          { path: 'dashboard', component: PrimerosPasosComponent },
          { path: 'dashboard/configuracion', component: PrimerosPasosComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimerosPasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the Figma first-steps panel', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Bienvenido, Ana');
    expect(text).toContain('Mi negocio está listo para empezar.');
    expect(text).toContain('Tus primeros pasos');
    expect(text).toContain('0 de 4 pasos obligatorios completados');
    expect(text).toContain('Aún no hay progreso registrado');
    expect(text).toContain('Agrega tu primer producto');
    expect(text).toContain('Abre tu caja');
    expect(text).toContain('Registra tu primera venta');
    expect(text).toContain('Registra tu primer gasto');
    expect(text).toContain('Ocultar guía');
    expect(text).toContain('Ir a Configuración');
  });

  it('should update progress when a step is completed', () => {
    component.completar(1);
    fixture.detectChanges();
    expect(component.total).toBe(1);
    expect(component.estadoPaso(1)).toBe('Completado');
    expect(component.estadoPaso(2)).toBe('Siguiente paso');
    expect(fixture.debugElement.nativeElement.textContent).toContain('1 de 4 pasos obligatorios completados');
  });

  it('should open Caja and POS from their steps', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.abrirPaso(component.pasos[1]);
    expect(spy).toHaveBeenCalledWith(['/caja']);
    component.abrirPaso(component.pasos[2]);
    expect(spy).toHaveBeenCalledWith(['/pos']);
    spy.mockRestore();
  });

  it('should mark product and expense steps as completed when opened', () => {
    component.abrirPaso(component.pasos[0]);
    component.abrirPaso(component.pasos[3]);
    expect(component.completados()).toEqual([1, 4]);
  });

  it('should hide the guide and go to Configuración', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onOcultarGuia();
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
    component.onConfiguracion();
    expect(spy).toHaveBeenCalledWith(['/dashboard/configuracion']);
    spy.mockRestore();
  });
});
