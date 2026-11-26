import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { RegistrarGastoComponent } from './registrar-gasto.component';

describe('RegistrarGastoComponent (FIN-08 Solo)', () => {
  let fixture: ComponentFixture<RegistrarGastoComponent>;
  let component: RegistrarGastoComponent;

  beforeEach(async () => {
    localStorage.removeItem('sgfidm-caja-abierta');
    await TestBed.configureTestingModule({
      imports: [
        RegistrarGastoComponent,
        FormsModule,
        RouterTestingModule.withRoutes([{ path: 'dashboard', component: RegistrarGastoComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('sgfidm-gastos');
    localStorage.removeItem('sgfidm-primer-gasto');
    localStorage.removeItem('sgfidm-caja-abierta');
  });

  it('should create and render the Figma expense drawer', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Registrar gasto');
    const inputs = fixture.debugElement.nativeElement.querySelectorAll('sgfidm-form-field input');
    expect(inputs[0].value).toContain('GAS-00049');
    expect(text).toContain('Monto ($) * (mayor a cero)');
    expect(text).toContain('Concepto * (obligatorio, máx. 120 caracteres)');
    expect(text).toContain('Categoría de gasto (opcional)');
    expect(text).toContain('Gestionar categorías');
    expect(text).toContain('Método de pago *');
    expect(text).toContain('Transferencia');
    expect(text).toContain('Referencia / ticket de comprobante (opcional)');
    expect(text).toContain('Mi negocio (solo lectura)');
    expect(text).toContain('Quién registra (solo lectura)');
    expect(text).toContain('Efectivo sin sesión');
  });

  it('should reject a non-positive amount', () => {
    component.monto.set('0');
    component.onRegistrar();
    expect(component.error()).toContain('mayor a cero');
  });

  it('should require a concept', () => {
    component.concepto.set('');
    component.onRegistrar();
    expect(component.error()).toContain('obligatorio');
  });

  it('should save an unlinked cash expense and complete INICIO-02', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onRegistrar();

    const gastos = JSON.parse(localStorage.getItem('sgfidm-gastos') || '[]');
    expect(gastos).toHaveLength(1);
    expect(gastos[0].codigo).toBe('GAS-00049');
    expect(gastos[0].monto).toBe(650);
    expect(gastos[0].metodo).toBe('Efectivo');
    expect(gastos[0].vinculadoCaja).toBe(false);
    expect(localStorage.getItem('sgfidm-primer-gasto')).toBe('true');
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
    spy.mockRestore();
  });

  it('should link a cash expense when a caja session is open', () => {
    localStorage.setItem('sgfidm-caja-abierta', '{}');
    const conCaja = TestBed.createComponent(RegistrarGastoComponent).componentInstance;
    expect(conCaja.cajaAbierta).toBe(true);
    expect(conCaja.sinCaja()).toBe(false);
    conCaja.onRegistrar();
    const gastos = JSON.parse(localStorage.getItem('sgfidm-gastos') || '[]');
    expect(gastos[0].vinculadoCaja).toBe(true);
  });

  it('should close the drawer back to the dashboard', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.cerrar();
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
    spy.mockRestore();
  });
});
