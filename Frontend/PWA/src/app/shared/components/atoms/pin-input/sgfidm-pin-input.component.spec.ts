import { TestBed } from '@angular/core/testing';
import { SgfidmPinInputComponent } from './sgfidm-pin-input.component';

describe('SgfidmPinInputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmPinInputComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmPinInputComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmPinInputComponent);
    const component = fixture.componentInstance;
    expect(component.label()).toBe('PIN de acceso rápido');
    expect(component.subtitle()).toBe('6 dígitos · 5 intentos máximos');
    expect(component.value()).toBe('');
    expect(component.error()).toBeNull();
    expect(component.disabled()).toBe(false);
    expect(component.pinLength).toBe(6);
  });

  it('debe calcular 6 dígitos en el arreglo', () => {
    const fixture = TestBed.createComponent(SgfidmPinInputComponent);
    const component = fixture.componentInstance;
    expect(component.digits().length).toBe(6);
  });

  it('debe detectar cuando el PIN está completo', () => {
    const fixture = TestBed.createComponent(SgfidmPinInputComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('value', '123456');
    expect(component.isComplete()).toBe(true);

    fixture.componentRef.setInput('value', '12345');
    expect(component.isComplete()).toBe(false);
  });

  it('debe detectar error cuando se proporciona un mensaje', () => {
    const fixture = TestBed.createComponent(SgfidmPinInputComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('error', 'PIN incorrecto');
    expect(component.hasError()).toBe(true);
  });

  it('debe emitir pinComplete cuando el PIN se completa', () => {
    const fixture = TestBed.createComponent(SgfidmPinInputComponent);
    const component = fixture.componentInstance;

    let emitted = '';
    component.pinComplete.subscribe((v) => { emitted = v; });

    fixture.componentRef.setInput('value', '12345');
    // Simular input con target mock
    const mockTarget = { value: '6' } as HTMLInputElement;
    const event = new Event('input', { bubbles: true });
    Object.defineProperty(event, 'target', { value: mockTarget, configurable: true });

    component.onDigitInput(5, event);

    expect(component.value()).toBe('123456');
    expect(emitted).toBe('123456');
  });

  it('debe borrar el valor al llamar clear', () => {
    const fixture = TestBed.createComponent(SgfidmPinInputComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('value', '123456');
    component.clear();
    expect(component.value()).toBe('');
  });

  it('debe renderizar 6 inputs de dígito', () => {
    const fixture = TestBed.createComponent(SgfidmPinInputComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const digits = compiled.querySelectorAll('.sgfidm-pin-input__digit');

    expect(digits.length).toBe(6);
  });

  it('debe aplicar clase error cuando hay error', () => {
    const fixture = TestBed.createComponent(SgfidmPinInputComponent);
    fixture.componentRef.setInput('error', 'PIN incorrecto');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.sgfidm-pin-input');

    expect(container?.classList.contains('sgfidm-pin-input--error')).toBe(true);
  });

  it('debe aplicar clase disabled cuando está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmPinInputComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.sgfidm-pin-input');

    expect(container?.classList.contains('sgfidm-pin-input--disabled')).toBe(true);
  });
});
