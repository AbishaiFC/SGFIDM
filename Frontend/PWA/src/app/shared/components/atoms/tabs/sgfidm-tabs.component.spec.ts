import { TestBed } from '@angular/core/testing';
import { SgfidmTabsComponent } from './sgfidm-tabs.component';

describe('SgfidmTabsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmTabsComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SgfidmTabsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe tener valores por defecto correctos', () => {
    const fixture = TestBed.createComponent(SgfidmTabsComponent);
    const component = fixture.componentInstance;
    expect(component.activeTab()).toBe('');
    expect(component.tabs()).toEqual([]);
  });

  it('debe calcular si una pestaña está activa', () => {
    const fixture = TestBed.createComponent(SgfidmTabsComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('tabs', ['A', 'B', 'C']);
    fixture.componentRef.setInput('activeTab', 'B');

    expect(component.isActive('B')).toBe(true);
    expect(component.isActive('A')).toBe(false);
    expect(component.isActive('C')).toBe(false);
  });

  it('debe seleccionar una pestaña y emitir el evento', () => {
    const fixture = TestBed.createComponent(SgfidmTabsComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('tabs', ['A', 'B', 'C']);

    let emitted = '';
    component.tabClick.subscribe((id) => { emitted = id; });

    component.selectTab('B');

    expect(component.activeTab()).toBe('B');
    expect(emitted).toBe('B');
  });

  it('debe renderizar la lista de pestañas', () => {
    const fixture = TestBed.createComponent(SgfidmTabsComponent);
    fixture.componentRef.setInput('tabs', ['A', 'B', 'C']);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tabs = compiled.querySelectorAll('.sgfidm-tabs__tab');

    expect(tabs.length).toBe(3);
    expect(tabs[0]?.textContent).toContain('A');
    expect(tabs[1]?.textContent).toContain('B');
    expect(tabs[2]?.textContent).toContain('C');
  });

  it('debe aplicar clase active a la pestaña seleccionada', () => {
    const fixture = TestBed.createComponent(SgfidmTabsComponent);
    fixture.componentRef.setInput('tabs', ['A', 'B']);
    fixture.componentRef.setInput('activeTab', 'B');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const activeTab = compiled.querySelector('.sgfidm-tabs__tab--active');

    expect(activeTab).toBeTruthy();
    expect(activeTab?.textContent).toContain('B');
  });
});
