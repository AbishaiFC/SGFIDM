import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HistorialMovimientosComponent } from './historial-movimientos.component';

describe('HistorialMovimientosComponent (INV-04 Solo)', () => {
  let fixture: ComponentFixture<HistorialMovimientosComponent>;
  let component: HistorialMovimientosComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialMovimientosComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the canonical movements history', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Historial de movimientos');
    expect(text).toContain('284 movimientos · registros inmutables · orden descendente');
    expect(text).toContain('Exportar');
    expect(
      fixture.debugElement.nativeElement
        .querySelector('sgfidm-search-bar input')
        ?.getAttribute('placeholder'),
    ).toBe('Código, producto, empleado o nota');
    expect(text).toContain('MOV-381');
    expect(text).toContain('Entrada · Compra');
    expect(fixture.debugElement.nativeElement.querySelectorAll('tbody tr')).toHaveLength(6);
  });

  it('should filter by search and type', () => {
    component.busqueda.set('MOV-380');
    expect(component.filtrados().map((m) => m.codigo)).toEqual(['MOV-380']);
    component.busqueda.set('');
    component.tipo.set('Salida');
    expect(component.filtrados()).toHaveLength(2);
  });

  it('should show a ToDo for export', () => {
    component.exportar();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('REP-07');
  });
});
