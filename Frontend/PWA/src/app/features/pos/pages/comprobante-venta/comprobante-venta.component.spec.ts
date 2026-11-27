import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ComprobanteVentaComponent } from './comprobante-venta.component';
import { PagoConfirmado } from '../procesar-pago/procesar-pago.component';

describe('ComprobanteVentaComponent (POS-04 Solo)', () => {
  let fixture: ComponentFixture<ComprobanteVentaComponent>;
  let component: ComprobanteVentaComponent;

  const pago: PagoConfirmado = {
    metodo: 'Efectivo',
    montoRecibido: 1000,
    cambio: 226,
    cliente: 'María López',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprobanteVentaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComprobanteVentaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pago', pago);
    fixture.componentRef.setInput('total', 774);
    fixture.detectChanges();
  });

  it('should render the thermal receipt preview and actions', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Comprobante de venta');
    expect(text).toContain('VISTA PREVIA · TÉRMICO 80 MM');
    expect(text).toContain('CAFÉ ALTURA');
    expect(text).toContain('VTA-1043');
    expect(text).toContain('Café de altura');
    expect(text).toContain('$774.00');
    expect(text).toContain('Recibido: $1,000.00');
    expect(text).toContain('Cambio: $226.00');
    expect(text).toContain('No válido como factura');
    expect(text).toContain('Descargar PDF');
  });

  it('should switch the format to A4', () => {
    component.formato.set('A4');
    fixture.detectChanges();
    const activo = fixture.debugElement.nativeElement.querySelector(
      '.comprobante-modal__formato--activo',
    );
    expect(activo?.textContent?.trim()).toBe('A4');
  });

  it('should emit cerrar', () => {
    let cerrado = false;
    component.cerrar.subscribe(() => (cerrado = true));
    const botones: HTMLButtonElement[] = Array.from(
      fixture.debugElement.nativeElement.querySelectorAll('sgfidm-button button'),
    );
    botones[0].click();
    expect(cerrado).toBe(true);
  });

  it('should use window.print for printing', () => {
    const spy = vi.spyOn(window, 'print').mockImplementation(() => {});
    component.imprimir();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
