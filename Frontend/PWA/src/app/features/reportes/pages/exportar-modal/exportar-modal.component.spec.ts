import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ExportarModalComponent, ExportacionSolicitud } from './exportar-modal.component';

describe('ExportarModalComponent (REP-07 Solo)', () => {
  let fixture: ComponentFixture<ExportarModalComponent>;
  let component: ExportarModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportarModalComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the shared export modal', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('MODAL DE EXPORTACIÓN · REP-02');
    expect(text).toContain('Exportar: Reporte de ventas');
    expect(text).toContain('RESUMEN DEL REPORTE');
    expect(text).toContain('Excel (XLSX)');
    expect(text).toContain('SIEMPRE ACTIVO');
    expect(text).toContain('50,000 filas');
    expect(text).toContain('FORMATO');
  });

  it('should show the CSV separator only for CSV', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#separador-export')).toBeNull();
    component.formato.set('CSV');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#separador-export')).toBeTruthy();
  });

  it('should emit the export request', () => {
    let solicitud: ExportacionSolicitud | undefined;
    component.exportar.subscribe((s) => (solicitud = s));
    component.confirmar();
    expect(solicitud?.formato).toBe('Excel (XLSX)');
    expect(solicitud?.filas).toBe(1284);
  });

  it('should disable export when rows exceed the limit', () => {
    fixture.componentRef.setInput('filas', 50001);
    expect(component.excedeLimite()).toBe(true);
  });
});
