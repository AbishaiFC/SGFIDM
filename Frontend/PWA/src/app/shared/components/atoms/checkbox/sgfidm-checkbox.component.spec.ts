import { TestBed } from '@angular/core/testing';
import { SgfidmCheckboxComponent } from './sgfidm-checkbox.component';

describe('SgfidmCheckboxComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmCheckboxComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmCheckboxComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmCheckboxComponent);
    const component = fixture.componentInstance;
    expect(component.label()).toBe('');
    expect(component.checked()).toBe(false);
    expect(component.disabled()).toBe(false);
  });

  it('debe calcular isChecked y isDisabled correctamente', () => {
    const fixture = TestBed.createComponent(SgfidmCheckboxComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('checked', true);
    expect(component.isChecked()).toBe(true);

    fixture.componentRef.setInput('disabled', true);
    expect(component.isDisabled()).toBe(true);
  });

  it('no debe emitir cambio si está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmCheckboxComponent);
    const component = fixture.componentInstance;

    let emitted = false;
    component.change.subscribe(() => (emitted = true));

    fixture.componentRef.setInput('disabled', true);
    component.onChange(new Event('change', { cancelable: true }));

    expect(emitted).toBe(false);
  });

  it('debe emitir cambio al cambiar el valor', () => {
    const fixture = TestBed.createComponent(SgfidmCheckboxComponent);
    const component = fixture.componentInstance;

    let emitted = false;
    component.change.subscribe((v) => { emitted = true; });

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.checked = true;
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));

    fixture.detectChanges();

    expect(component.checked()).toBe(true);
    expect(emitted).toBe(true);
  });

  it('debe renderizar el input checkbox', () => {
    const fixture = TestBed.createComponent(SgfidmCheckboxComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
  });

  it('debe renderizar la caja del checkbox con clase checked cuando está seleccionado', () => {
    const fixture = TestBed.createComponent(SgfidmCheckboxComponent);
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.sgfidm-checkbox');

    expect(container?.classList.contains('sgfidm-checkbox--checked')).toBe(true);
  });

  it('debe aplicar clase disabled cuando está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmCheckboxComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.sgfidm-checkbox');

    expect(container?.classList.contains('sgfidm-checkbox--disabled')).toBe(true);
  });
});
