import { TestBed } from '@angular/core/testing';
import { SgfidmProgressComponent } from './sgfidm-progress.component';

describe('SgfidmProgressComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmProgressComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmProgressComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmProgressComponent);
    const component = fixture.componentInstance;
    expect(component.value()).toBe(0);
    expect(component.type()).toBe('determinate');
  });

  it('debe calcular el ancho del relleno según el valor', () => {
    const fixture = TestBed.createComponent(SgfidmProgressComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('value', 50);
    expect(component.fillWidth()).toBe('50%');

    fixture.componentRef.setInput('value', 100);
    expect(component.fillWidth()).toBe('100%');

    fixture.componentRef.setInput('value', 0);
    expect(component.fillWidth()).toBe('0%');
  });

  it('debe limitar el valor entre 0 y 100', () => {
    const fixture = TestBed.createComponent(SgfidmProgressComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('value', -10);
    expect(component.fillWidth()).toBe('0%');

    fixture.componentRef.setInput('value', 150);
    expect(component.fillWidth()).toBe('100%');
  });

  it('debe soportar tipo indeterminate', () => {
    const fixture = TestBed.createComponent(SgfidmProgressComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('type', 'indeterminate');
    expect(component.type()).toBe('indeterminate');
    expect(component.fillWidth()).toBe('100%');
  });

  it('debe renderizar la pista y el relleno', () => {
    const fixture = TestBed.createComponent(SgfidmProgressComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const track = compiled.querySelector('.sgfidm-progress__track');
    const fill = compiled.querySelector('.sgfidm-progress__fill');

    expect(track).toBeTruthy();
    expect(fill).toBeTruthy();
  });

  it('debe aplicar clase indeterminate cuando el tipo es indeterminate', () => {
    const fixture = TestBed.createComponent(SgfidmProgressComponent);
    fixture.componentRef.setInput('type', 'indeterminate');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.sgfidm-progress');

    expect(container?.classList.contains('sgfidm-progress--indeterminate')).toBe(true);
  });
});
