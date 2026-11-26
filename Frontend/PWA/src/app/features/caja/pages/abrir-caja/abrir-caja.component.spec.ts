import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { AbrirCajaComponent } from './abrir-caja.component';

describe('AbrirCajaComponent (CAJ-02 Solo)', () => {
  let fixture: ComponentFixture<AbrirCajaComponent>;
  let component: AbrirCajaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AbrirCajaComponent,
        FormsModule,
        RouterTestingModule.withRoutes([{ path: 'caja', component: AbrirCajaComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AbrirCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.removeItem('sgfidm-caja-abierta'));

  it('should create and render the Figma opening form', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Abrir caja');
    expect(text).toContain('Inicia una nueva sesión de caja para habilitar ventas en efectivo en el POS');
    expect(text).toContain('DATOS DE LA SESIÓN');
    const inputs = fixture.debugElement.nativeElement.querySelectorAll('sgfidm-form-field input');
    expect(inputs[0].value).toContain('Mi negocio');
    expect(inputs[1].value).toContain('Ana Martínez · Propietaria');
    expect(text).toContain('Fondo inicial en efectivo ($)');
    expect(text).toContain('Sugerido según tu último cierre: $1,500.00. Puedes cambiarlo.');
    expect(text).toContain('Notas de apertura');
    expect(text).toContain(`${component.notasLength} / 200`);
    expect(text).toContain('Cancelar');
  });

  it('should save the session and navigate to Caja', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onAbrir();

    const guardado = JSON.parse(localStorage.getItem('sgfidm-caja-abierta') || '{}');
    expect(guardado.fondo).toBe(1500);
    expect(spy).toHaveBeenCalledWith(['/caja']);
    spy.mockRestore();
  });

  it('should reject an invalid initial amount', () => {
    component.fondo = 'abc';
    component.onAbrir();
    expect(component.error()).toContain('fondo inicial válido');
  });

  it('should cancel back to Caja', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onCancelar();
    expect(spy).toHaveBeenCalledWith(['/caja']);
    spy.mockRestore();
  });
});
