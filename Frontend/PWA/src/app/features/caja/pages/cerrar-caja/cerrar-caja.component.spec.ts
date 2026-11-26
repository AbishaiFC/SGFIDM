import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { CerrarCajaComponent } from './cerrar-caja.component';

describe('CerrarCajaComponent (CAJ-03 Solo)', () => {
  let fixture: ComponentFixture<CerrarCajaComponent>;
  let component: CerrarCajaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CerrarCajaComponent,
        FormsModule,
        RouterTestingModule.withRoutes([{ path: 'caja', component: CerrarCajaComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CerrarCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('sgfidm-caja-cerrada');
    localStorage.removeItem('sgfidm-caja-abierta');
  });

  it('should create and render the Figma closing form', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Cerrar caja — CAJ-002');
    expect(text).toContain('RESUMEN CALCULADO POR EL SISTEMA (SOLO LECTURA)');
    expect(text).toContain('TOTAL EFECTIVO ESPERADO EN CAJA');
    expect(text).toContain('$4,820.00');
    expect(text).toContain('CONTEO DEL EFECTIVO FÍSICO (ARQUEO)');
    expect(text).toContain('Caja cuadrada');
    expect(text).toContain('Cerrar caja definitivamente');
  });

  it('should compute the difference from the counted cash', () => {
    component.contado.set('4,870.00');
    expect(component.diferencia()).toBe(50);
    expect(component.esCuadrada).toBe(false);
  });

  it('should require the confirmation before closing', () => {
    component.onCerrar();
    expect(component.error()).toContain('Debes confirmar el conteo');
  });

  it('should save the closure and return to Caja', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.confirmado = true;
    component.onCerrar();

    const guardado = JSON.parse(localStorage.getItem('sgfidm-caja-cerrada') || '{}');
    expect(guardado.diferencia).toBe(0);
    expect(spy).toHaveBeenCalledWith(['/caja']);
    spy.mockRestore();
  });
});
