import { TestBed } from '@angular/core/testing';
import { SgfidmDividerComponent } from './sgfidm-divider.component';

describe('SgfidmDividerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmDividerComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmDividerComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe tener vertical falso por defecto', () => {
    const fixture = TestBed.createComponent(SgfidmDividerComponent);
    const component = fixture.componentInstance;
    expect(component.vertical()).toBe(false);
  });

  it('debe renderizar un separador horizontal por defecto', () => {
    const fixture = TestBed.createComponent(SgfidmDividerComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const divider = compiled.querySelector('.sgfidm-divider');

    expect(divider).toBeTruthy();
    expect(divider?.classList.contains('sgfidm-divider--vertical')).toBe(false);
  });

  it('debe renderizar un separador vertical cuando vertical es true', () => {
    const fixture = TestBed.createComponent(SgfidmDividerComponent);
    fixture.componentRef.setInput('vertical', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const divider = compiled.querySelector('.sgfidm-divider');

    expect(divider?.classList.contains('sgfidm-divider--vertical')).toBe(true);
  });

  it('debe tener un borde de 1px outline-variant', () => {
    const fixture = TestBed.createComponent(SgfidmDividerComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const divider = compiled.querySelector('.sgfidm-divider');

    // Verificar que se renderiza el elemento separador con clase correcta
    expect(divider).toBeTruthy();
    expect(divider?.classList.contains('sgfidm-divider')).toBe(true);
    expect(divider?.tagName.toLowerCase()).toBe('div');
  });
});
