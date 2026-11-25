import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmP8EncabezadoReporteComponent, P8FilterDto } from './sgfidm-p8-encabezado-reporte.component';
import { SharedModule } from '../../../../shared.module';

describe('SgfidmP8EncabezadoReporteComponent', () => {
  let component: SgfidmP8EncabezadoReporteComponent;
  let fixture: ComponentFixture<SgfidmP8EncabezadoReporteComponent>;

  const filters: P8FilterDto[] = [
    { key: 'employee', label: 'Empleado', value: 'AbishaiFC' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmP8EncabezadoReporteComponent, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmP8EncabezadoReporteComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Historial de movimientos');
    fixture.componentRef.setInput('periodo', '2026-11-01 a 2026-11-24');
    fixture.componentRef.setInput('sucursal', 'Principal');
    fixture.componentRef.setInput('filters', filters);
    fixture.componentRef.setInput('usuario', 'AbishaiFC');
    fixture.componentRef.setInput('moneda', 'MXN');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and metadata', () => {
    const el = fixture.debugElement.query(By.css('.p8-encabezado-reporte'));
    const text = el.nativeElement.textContent;
    expect(text).toContain('Historial de movimientos');
    expect(text).toContain('Periodo: 2026-11-01 a 2026-11-24');
    expect(text).toContain('Sucursal: Principal');
    expect(text).toContain('Empleado: AbishaiFC');
    expect(text).toContain('Moneda: MXN');
  });

  it('should emit export on Exportar click', () => {
    let exported = false;
    component.export.subscribe(() => (exported = true));
    const btn = fixture.debugElement.query(By.css('.p8-encabezado-reporte__actions sgfidm-button'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(exported).toBeTruthy();
  });
});
