import { TestBed } from '@angular/core/testing';
import { SgfidmTooltipComponent } from './sgfidm-tooltip.component';

describe('SgfidmTooltipComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmTooltipComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmTooltipComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmTooltipComponent);
    const component = fixture.componentInstance;
    expect(component.message()).toBe('');
    expect(component.visible()).toBe(false);
  });

  it('debe renderizar el mensaje del tooltip', () => {
    const fixture = TestBed.createComponent(SgfidmTooltipComponent);
    fixture.componentRef.setInput('message', 'Texto de ayuda');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tooltip = compiled.querySelector('.sgfidm-tooltip');

    expect(tooltip?.textContent).toContain('Texto de ayuda');
  });

  it('debe aplicar clase visible cuando visible es true', () => {
    const fixture = TestBed.createComponent(SgfidmTooltipComponent);
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tooltip = compiled.querySelector('.sgfidm-tooltip');

    expect(tooltip?.classList.contains('sgfidm-tooltip--visible')).toBe(true);
  });

  it('debe tener fondo inverse-surface y texto EBEBEB', () => {
    const fixture = TestBed.createComponent(SgfidmTooltipComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tooltip = compiled.querySelector('.sgfidm-tooltip');
    const computedStyle = getComputedStyle(tooltip!);

    expect(computedStyle.backgroundColor).toContain('28'); // #1C1C1C -> rgb(28, 28, 28)
    expect(computedStyle.color).toContain('235'); // #EBEBEB -> rgb(235, 235, 235)
  });
});
