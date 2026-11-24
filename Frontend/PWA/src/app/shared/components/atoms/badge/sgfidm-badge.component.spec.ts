import { TestBed } from '@angular/core/testing';
import { SgfidmBadgeComponent } from './sgfidm-badge.component';

describe('SgfidmBadgeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmBadgeComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmBadgeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe tener variante neutral por defecto', () => {
    const fixture = TestBed.createComponent(SgfidmBadgeComponent);
    const component = fixture.componentInstance;
    expect(component.variant()).toBe('neutral');
  });

  it('debe calcular el color de fondo según la variante', () => {
    const fixture = TestBed.createComponent(SgfidmBadgeComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('variant', 'error');
    expect(component.fillColor()).toBe('var(--sgfidm-color-error)');

    fixture.componentRef.setInput('variant', 'warning');
    expect(component.fillColor()).toBe('var(--sgfidm-color-warning)');

    fixture.componentRef.setInput('variant', 'info');
    expect(component.fillColor()).toBe('var(--sgfidm-color-info)');

    fixture.componentRef.setInput('variant', 'success');
    expect(component.fillColor()).toBe('var(--sgfidm-color-success)');

    fixture.componentRef.setInput('variant', 'neutral');
    expect(component.fillColor()).toBe('var(--sgfidm-color-inverse-surface)');
  });

  it('debe calcular el color de texto siempre como on-primary', () => {
    const fixture = TestBed.createComponent(SgfidmBadgeComponent);
    const component = fixture.componentInstance;
    expect(component.textColor()).toBe('var(--sgfidm-color-on-primary)');
  });

  it('debe soportar todas las variantes definidas en el Design System', () => {
    const fixture = TestBed.createComponent(SgfidmBadgeComponent);
    const component = fixture.componentInstance;

    const variants: Array<'neutral' | 'error' | 'warning' | 'info' | 'success'> = [
      'neutral',
      'error',
      'warning',
      'info',
      'success',
    ];

    variants.forEach((v) => {
      fixture.componentRef.setInput('variant', v);
      expect(component.variant()).toBe(v);
    });
  });

  it('debe renderizar el badge con la clase y estilo correctos', () => {
    const fixture = TestBed.createComponent(SgfidmBadgeComponent);
    fixture.componentRef.setInput('variant', 'error');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.sgfidm-badge') as HTMLElement;

    expect(badge).toBeTruthy();
    expect(badge.classList.contains('sgfidm-badge')).toBe(true);
    expect(badge.style.backgroundColor).toContain('--sgfidm-color-error');
  });
});
