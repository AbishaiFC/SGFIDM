import { TestBed } from '@angular/core/testing';
import { SgfidmIconButtonComponent } from './sgfidm-icon-button.component';

describe('SgfidmIconButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmIconButtonComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmIconButtonComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmIconButtonComponent);
    const component = fixture.componentInstance;
    expect(component.type()).toBe('standard');
    expect(component.disabled()).toBe(false);
  });

  it('debe calcular el tamaño como hit target (40px)', () => {
    const fixture = TestBed.createComponent(SgfidmIconButtonComponent);
    const component = fixture.componentInstance;
    expect(component.size()).toBe('var(--sgfidm-hit-target)');
  });

  it('debe calcular el radio como radius-full', () => {
    const fixture = TestBed.createComponent(SgfidmIconButtonComponent);
    const component = fixture.componentInstance;
    expect(component.radius()).toBe('var(--sgfidm-radius-full)');
  });

  it('no debe emitir click si está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmIconButtonComponent);
    const component = fixture.componentInstance;

    let clicked = false;
    component.click.subscribe(() => (clicked = true));

    fixture.componentRef.setInput('disabled', true);
    component.onClick(new Event('click'));

    expect(clicked).toBe(false);
  });

  it('debe emitir click cuando no está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmIconButtonComponent);
    const component = fixture.componentInstance;

    let clicked = false;
    component.click.subscribe(() => (clicked = true));

    fixture.componentRef.setInput('disabled', false);
    component.onClick(new Event('click'));

    expect(clicked).toBe(true);
  });

  it('debe prevenir el evento por defecto cuando está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmIconButtonComponent);
    const component = fixture.componentInstance;

    const event = new Event('click', { cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    fixture.componentRef.setInput('disabled', true);
    component.onClick(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('debe soportar ambos tipos: standard y filled', () => {
    const fixture = TestBed.createComponent(SgfidmIconButtonComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('type', 'standard');
    expect(component.type()).toBe('standard');

    fixture.componentRef.setInput('type', 'filled');
    expect(component.type()).toBe('filled');
  });

  it('debe renderizar el botón con el tamaño de hit target', () => {
    const fixture = TestBed.createComponent(SgfidmIconButtonComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');

    expect(button).toBeTruthy();
    expect(button?.style.width).toBe('var(--sgfidm-hit-target)');
  });
});
