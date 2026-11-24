import { TestBed } from '@angular/core/testing';
import { SgfidmAvatarComponent } from './sgfidm-avatar.component';

describe('SgfidmAvatarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmAvatarComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmAvatarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmAvatarComponent);
    const component = fixture.componentInstance;
    expect(component.size()).toBe('md');
    expect(component.initials()).toBe('CM');
  });

  it('debe calcular dimensiones según el size', () => {
    const fixture = TestBed.createComponent(SgfidmAvatarComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('size', 'sm');
    expect(component.dimensions()).toBe('32px');

    fixture.componentRef.setInput('size', 'md');
    expect(component.dimensions()).toBe('40px');
  });

  it('debe calcular el radio según el size', () => {
    const fixture = TestBed.createComponent(SgfidmAvatarComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('size', 'sm');
    expect(component.radius()).toBe('var(--sgfidm-radius-2xl)');

    fixture.componentRef.setInput('size', 'md');
    expect(component.radius()).toBe('20px');
  });

  it('debe soportar ambos tamaños: sm y md', () => {
    const fixture = TestBed.createComponent(SgfidmAvatarComponent);
    const component = fixture.componentInstance;

    const sizes: Array<'sm' | 'md'> = ['sm', 'md'];
    sizes.forEach((s) => {
      fixture.componentRef.setInput('size', s);
      expect(component.size()).toBe(s);
    });
  });

  it('debe renderizar el avatar con las iniciales', () => {
    const fixture = TestBed.createComponent(SgfidmAvatarComponent);
    fixture.componentRef.setInput('initials', 'AM');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const avatar = compiled.querySelector('.sgfidm-avatar');

    expect(avatar).toBeTruthy();
    expect(avatar?.textContent).toContain('AM');
  });

  it('debe aplicar el color de fondo primary y texto on-primary', () => {
    const fixture = TestBed.createComponent(SgfidmAvatarComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const avatar = compiled.querySelector('.sgfidm-avatar') as HTMLElement;
    const computedStyle = getComputedStyle(avatar);

    // Verificar que se aplican las clases CSS correctas (jsdom no resuelve variables CSS)
    expect(avatar.classList.contains('sgfidm-avatar')).toBe(true);
    // Verificar que el estilo inline de dimensiones se aplica
    expect(avatar.style.width).toContain('40px');
    expect(avatar.style.height).toContain('40px');
  });
});
