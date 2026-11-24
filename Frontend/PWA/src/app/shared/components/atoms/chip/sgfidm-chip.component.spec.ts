import { TestBed } from '@angular/core/testing';
import { SgfidmChipComponent } from './sgfidm-chip.component';

describe('SgfidmChipComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmChipComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmChipComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmChipComponent);
    const component = fixture.componentInstance;
    expect(component.variant()).toBe('filter');
    expect(component.selected()).toBe(false);
    expect(component.disabled()).toBe(false);
  });

  it('debe calcular isSelected y isDisabled correctamente', () => {
    const fixture = TestBed.createComponent(SgfidmChipComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('selected', true);
    expect(component.isSelected()).toBe(true);

    fixture.componentRef.setInput('disabled', true);
    expect(component.isDisabled()).toBe(true);
  });

  it('no debe emitir click si está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmChipComponent);
    const component = fixture.componentInstance;

    let clicked = false;
    component.click.subscribe(() => (clicked = true));

    fixture.componentRef.setInput('disabled', true);
    component.onClick(new Event('click', { cancelable: true }));

    expect(clicked).toBe(false);
  });

  it('debe emitir click cuando no está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmChipComponent);
    const component = fixture.componentInstance;

    let clicked = false;
    component.click.subscribe(() => (clicked = true));

    fixture.componentRef.setInput('disabled', false);
    component.onClick(new Event('click'));

    expect(clicked).toBe(true);
  });

  it('debe prevenir el evento por defecto cuando está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmChipComponent);
    const component = fixture.componentInstance;

    const event = new Event('click', { cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    fixture.componentRef.setInput('disabled', true);
    component.onClick(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('debe soportar todas las variantes definidas en el Design System', () => {
    const fixture = TestBed.createComponent(SgfidmChipComponent);
    const component = fixture.componentInstance;

    const variants: Array<'filter' | 'category' | 'status'> = [
      'filter',
      'category',
      'status',
    ];

    variants.forEach((v) => {
      fixture.componentRef.setInput('variant', v);
      expect(component.variant()).toBe(v);
    });
  });

  it('debe renderizar el botón chip', () => {
    const fixture = TestBed.createComponent(SgfidmChipComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');

    expect(button).toBeTruthy();
  });

  it('debe aplicar clase selected cuando está seleccionado', () => {
    const fixture = TestBed.createComponent(SgfidmChipComponent);
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.sgfidm-chip');

    expect(container?.classList.contains('sgfidm-chip--selected')).toBe(true);
  });

  it('debe aplicar clase disabled cuando está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmChipComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.sgfidm-chip');

    expect(container?.classList.contains('sgfidm-chip--disabled')).toBe(true);
  });
});
