import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmReportesOrganismComponent, ReporteDto } from './sgfidm-reportes-organism.component';

describe('SgfidmReportesOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmReportesOrganismComponent>;
  let component: SgfidmReportesOrganismComponent;

  const sample: ReporteDto[] = [
    { id: 'R-001', nombre: 'Reporte de ventas', descripcion: 'Ventas por período', exportadores: ['xlsx', 'csv'] },
    { id: 'R-002', nombre: 'Reporte de inventario', descripcion: 'Stock por producto', exportadores: ['csv'] },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmReportesOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmReportesOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('reportes', sample);
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-reportes-organism__title'));
    expect(title.nativeElement.textContent).toContain('Reportes');
  });

  it('should render indicator cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('sgfidm-indicator-card'));
    expect(cards.length).toBe(2);
  });

  it('should compute totalReportes and xlsxCount', () => {
    expect(component.totalReportes).toBe('2');
    expect(component.xlsxCount).toBe('1');
  });

  it('should emit accion consultar on report click', () => {
    let emitted: { reporte: ReporteDto; tipo: string } | undefined;
    component.accion.subscribe((e) => (emitted = e));
    const items = fixture.debugElement.queryAll(By.css('.sgfidm-reportes-organism__item'));
    items[0].triggerEventHandler('click', null);
    expect(emitted?.tipo).toBe('consultar');
    expect(emitted?.reporte.id).toBe('R-001');
  });

  it('should render export buttons for reportes with exportadores', () => {
    const btns = fixture.debugElement.queryAll(By.css('.sgfidm-reportes-organism__actions sgfidm-button'));
    expect(btns.length).toBe(3); // XLSX + CSV (R-001) + CSV (R-002)
  });

  it('should render empty state when no reportes', () => {
    fixture.componentRef.setInput('reportes', []);
    fixture.detectChanges();
    const empty = fixture.debugElement.query(By.css('.sgfidm-reportes-organism__empty'));
    expect(empty).toBeTruthy();
  });
});
