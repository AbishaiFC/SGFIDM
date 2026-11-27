import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProcesarPagoComponent, PagoConfirmado } from './procesar-pago.component';

describe('ProcesarPagoComponent (POS-02 Solo)', () => {
  let fixture: ComponentFixture<ProcesarPagoComponent>;
  let component: ProcesarPagoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesarPagoComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcesarPagoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('total', 774);
    fixture.detectChanges();
  });

  it('should render the canonical payment modal', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Procesar pago');
    expect(text).toContain('Venta en curso · Mi negocio · CAJ-002');
    expect(text).toContain('TOTAL A PAGAR');
    expect(text).toContain('$774.00');
    expect(text).toContain('MÉTODO DE PAGO');
    expect(text).toContain('Efectivo · predeterminado');
    expect(text).toContain('DENOMINACIONES COMUNES');
    expect(text).toContain('Confirmar pago');
  });

  it('should compute the change from the received amount', () => {
    expect(component.cambio()).toBe(226);
    component.usarDenominacion(500);
    expect(component.cambio()).toBe(0);
  });

  it('should emit the confirmed payment', () => {
    let pago: PagoConfirmado | undefined;
    component.confirmar.subscribe((p) => (pago = p));
    component.confirmarPago();
    expect(pago?.metodo).toBe('Efectivo');
    expect(pago?.cambio).toBe(226);
  });

  it('should reject an insufficient cash amount', () => {
    component.montoTexto.set('500');
    component.confirmarPago();
    expect(component.error()).toContain('debe cubrir el total');
  });
});
