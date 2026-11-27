import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { AlertasStockComponent } from './alertas-stock.component';

describe('AlertasStockComponent (INV-08 Solo)', () => {
  let fixture: ComponentFixture<AlertasStockComponent>;
  let component: AlertasStockComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AlertasStockComponent,
        RouterTestingModule.withRoutes([{ path: 'inventario/PROD-022', component: AlertasStockComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertasStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render both alert panels', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Alertas de stock');
    expect(text).toContain('2 productos agotados · 6 con bajo stock');
    expect(text).toContain('Agotados · prioridad alta');
    expect(text).toContain('Taza térmica');
    expect(text).toContain('PROD-022');
    expect(text).toContain('Bajo stock · déficit');
    expect(text).toContain('Grano de café');
    expect(text).toContain('3 / 8');
    expect(fixture.debugElement.nativeElement.querySelectorAll('sgfidm-panel-card')).toHaveLength(2);
  });

  it('should switch the filter', () => {
    component.vista.set('Bajo stock');
    fixture.detectChanges();
    expect(component.vista()).toBe('Bajo stock');
  });

  it('should open the stock detail from a product', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.abrir('PROD-022');
    expect(spy).toHaveBeenCalledWith(['/inventario', 'PROD-022']);
    spy.mockRestore();
  });
});
