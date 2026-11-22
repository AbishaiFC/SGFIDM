import { TestBed } from '@angular/core/testing';
import { SgfidmTextFieldComponent } from './sgfidm-text-field.component';

describe('SgfidmTextFieldComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmTextFieldComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmTextFieldComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmTextFieldComponent);
    const component = fixture.componentInstance;
    expect(component.label()).toBe('');
    expect(component.placeholder()).toBe('');
    expect(component.value()).toBe('');
    expect(component.disabled()).toBe(false);
    expect(component.error()).toBeNull();
    expect(component.type()).toBe('text');
    expect(component.hasError()).toBe(false);
  });

  it('debe calcular la altura del campo como 44px', () => {
    const fixture = TestBed.createComponent(SgfidmTextFieldComponent);
    const component = fixture.componentInstance;
    expect(component.fieldHeight()).toBe('var(--sgfidm-field-height)');
  });

  it('debe detectar error cuando se proporciona un mensaje', () => {
    const fixture = TestBed.createComponent(SgfidmTextFieldComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('error', 'Este campo es obligatorio.');
    expect(component.hasError()).toBe(true);
  });

  it('debe actualizar el valor mediante el evento input', () => {
    const fixture = TestBed.createComponent(SgfidmTextFieldComponent);
    const component = fixture.componentInstance;

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'valor de prueba';
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));

    fixture.detectChanges();

    expect(component.value()).toBe('valor de prueba');
  });

  it('debe emitir el valor mediante el output change', () => {
    const fixture = TestBed.createComponent(SgfidmTextFieldComponent);
    const component = fixture.componentInstance;

    let emittedValue = '';
    component.change.subscribe((v) => (emittedValue = v));

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'nuevo valor';
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));

    fixture.detectChanges();

    expect(emittedValue).toBe('nuevo valor');
  });

  it('debe soportar todos los tipos de input definidos', () => {
    const fixture = TestBed.createComponent(SgfidmTextFieldComponent);
    const component = fixture.componentInstance;

    const types: Array<'text' | 'email' | 'password' | 'number'> = [
      'text',
      'email',
      'password',
      'number',
    ];

    types.forEach((t) => {
      fixture.componentRef.setInput('type', t);
      expect(component.type()).toBe(t);
    });
  });

  it('debe renderizar el label cuando se proporciona', () => {
    const fixture = TestBed.createComponent(SgfidmTextFieldComponent);
    fixture.componentRef.setInput('label', 'Correo electrónico');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const label = compiled.querySelector('.sgfidm-text-field__label');

    expect(label?.textContent).toContain('Correo electrónico');
  });

  it('debe renderizar el mensaje de error cuando hay error', () => {
    const fixture = TestBed.createComponent(SgfidmTextFieldComponent);
    fixture.componentRef.setInput('error', 'Este campo es obligatorio.');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const error = compiled.querySelector('.sgfidm-text-field__error');

    expect(error?.textContent).toContain('Este campo es obligatorio.');
  });

  it('debe aplicar clase disabled cuando está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmTextFieldComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.sgfidm-text-field');

    expect(container?.classList.contains('sgfidm-text-field--disabled')).toBe(true);
  });
});
