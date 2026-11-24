import { TestBed } from '@angular/core/testing';
import { SgfidmRadioComponent } from './sgfidm-radio.component';

describe('SgfidmRadioComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmRadioComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmRadioComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmRadioComponent);
    const component = fixture.componentInstance;
    expect(component.label()).toBe('');
    expect(component.value()).toBe('');
    expect(component.selectedValue()).toBe('');
    expect(component.disabled()).toBe(false);
  });

  it('debe calcular isSelected cuando el valor coincide', () => {
    const fixture = TestBed.createComponent(SgfidmRadioComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('value', 'opcion1');
    fixture.componentRef.setInput('selectedValue', 'opcion1');
    expect(component.isSelected()).toBe(true);
  });

  it('no debe emitir cambio si está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmRadioComponent);
    const component = fixture.componentInstance;

    let emitted = false;
    component.change.subscribe(() => (emitted = true));

    fixture.componentRef.setInput('disabled', true);
    component.onChange(new Event('change', { cancelable: true }));

    expect(emitted).toBe(false);
  });

  it('debe emitir cambio al seleccionar una opción', () => {
    const fixture = TestBed.createComponent(SgfidmRadioComponent);
    const component = fixture.componentInstance;

    let emitted = false;
    component.change.subscribe((v) => { emitted = true; });

    fixture.componentRef.setInput('value', 'opcion1');
    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.click();

    expect(component.selectedValue()).toBe('opcion1');
    expect(emitted).toBe(true);
  });

  it('debe renderizar el input radio', () => {
    const fixture = TestBed.createComponent(SgfidmRadioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[type="radio"]');
    expect(input).toBeTruthy();
  });

  it('debe renderizar la clase selected cuando el valor coincide', () => {
    const fixture = TestBed.createComponent(SgfidmRadioComponent);
    fixture.componentRef.setInput('value', 'opcion1');
    fixture.componentRef.setInput('selectedValue', 'opcion1');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.sgfidm-radio');

    expect(container?.classList.contains('sgfidm-radio--selected')).toBe(true);
  });

  it('debe aplicar clase disabled cuando está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmRadioComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.sgfidm-radio');

    expect(container?.classList.contains('sgfidm-radio--disabled')).toBe(true);
  });
});
