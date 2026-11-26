import { TestBed } from '@angular/core/testing';
import { SgfidmButtonComponent } from './sgfidm-button.component';

describe('SgfidmButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmButtonComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;
    expect(component.type()).toBe('primary');
    expect(component.size()).toBe('md');
    expect(component.disabled()).toBe(false);
    expect(component.loading()).toBe(false);
  });

  it('debe calcular la altura según el size', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('size', 'sm');
    expect(component.buttonHeight()).toBe('var(--sgfidm-btn-height-sm)');

    fixture.componentRef.setInput('size', 'md');
    expect(component.buttonHeight()).toBe('var(--sgfidm-btn-height-md)');

    fixture.componentRef.setInput('size', 'lg');
    expect(component.buttonHeight()).toBe('var(--sgfidm-btn-height-lg)');
  });

  it('debe permitir ancho y alto explícitos sin ::ng-deep en las vistas', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('width', '94px');
    fixture.componentRef.setInput('height', '44px');
    expect(component.buttonWidth()).toBe('94px');
    expect(component.buttonHeight()).toBe('44px');

    fixture.componentRef.setInput('fullWidth', true);
    expect(component.buttonWidth()).toBe('100%');
  });

  it('debe calcular el padding X según el size', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('size', 'sm');
    expect(component.paddingX()).toBe('13px');

    fixture.componentRef.setInput('size', 'md');
    expect(component.paddingX()).toBe('18px');

    fixture.componentRef.setInput('size', 'lg');
    expect(component.paddingX()).toBe('22px');
  });

  it('no debe emitir click si está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;

    let clicked = false;
    component.click.subscribe(() => (clicked = true));

    fixture.componentRef.setInput('disabled', true);
    component.onClick(new Event('click'));

    expect(clicked).toBe(false);
  });

  it('no debe emitir click si está cargando', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;

    let clicked = false;
    component.click.subscribe(() => (clicked = true));

    fixture.componentRef.setInput('loading', true);
    component.onClick(new Event('click'));

    expect(clicked).toBe(false);
  });

  it('debe emitir click cuando se hace clic y no está deshabilitado ni cargando', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;

    let clicked = false;
    component.click.subscribe(() => (clicked = true));

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', false);
    component.onClick(new Event('click'));

    expect(clicked).toBe(true);
  });

  it('debe prevenir el evento por defecto cuando está deshabilitado', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;

    const event = new Event('click', { cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    fixture.componentRef.setInput('disabled', true);
    component.onClick(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('debe soportar todos los tipos definidos en el Design System', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;

    const types: Array<'primary' | 'secondary' | 'tertiary' | 'destructive'> = [
      'primary',
      'secondary',
      'tertiary',
      'destructive',
    ];

    types.forEach((t) => {
      fixture.componentRef.setInput('type', t);
      expect(component.type()).toBe(t);
    });
  });

  it('debe soportar todos los tamaños definidos en el Design System', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    const component = fixture.componentInstance;

    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((s) => {
      fixture.componentRef.setInput('size', s);
      expect(component.size()).toBe(s);
    });
  });

  it('debe renderizar el botón con la clase de tipo primary', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');

    expect(button).toBeTruthy();
    expect(button?.classList.contains('sgfidm-button--primary')).toBe(true);
  });

  it('debe renderizar el spinner cuando está en estado loading', () => {
    const fixture = TestBed.createComponent(SgfidmButtonComponent);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const spinner = compiled.querySelector('.sgfidm-button__spinner');

    expect(spinner).toBeTruthy();
  });
});
