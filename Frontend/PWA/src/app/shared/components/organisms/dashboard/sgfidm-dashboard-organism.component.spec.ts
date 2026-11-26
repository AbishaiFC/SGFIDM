import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmDashboardOrganismComponent } from './sgfidm-dashboard-organism.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

describe('SgfidmDashboardOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmDashboardOrganismComponent>;
  let component: SgfidmDashboardOrganismComponent;

  beforeEach(async () => {
    localStorage.setItem('sgfidm-caja-abierta', '{}');
    await TestBed.configureTestingModule({
      imports: [SgfidmDashboardOrganismComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmDashboardOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('indicators', [
      { eyebrow: 'VENTAS DEL DÍA', value: '$100.00', delta: 'Hoy' },
      { eyebrow: 'ESTADO DE CAJA', value: 'Abierta', delta: 'Abre una caja' },
    ]);
    fixture.detectChanges();
  });

  it('should render the Figma operational header', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-dashboard-organism__title'));
    expect(title.nativeElement.textContent).toContain('Buenos días, Ana');
    const subtitle = fixture.debugElement.query(By.css('.sgfidm-dashboard-organism__subtitle'));
    expect(subtitle.nativeElement.textContent).toContain('Este es el estado de Mi negocio hoy.');
  });

  it('should render the cash status, alerts and recent activity', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Caja abierta');
    expect(text).toContain('Puedes vender ahora');
    expect(text).toContain('Requiere tu atención');
    expect(text).toContain('Productos con bajo stock');
    expect(text).toContain('Actividad reciente');
    expect(text).toContain('Venta · $340');
    expect(text).toContain('ACCIONES RÁPIDAS');
  });

  it('should navigate from the quick actions to their views', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const botones: HTMLButtonElement[] = Array.from(
      fixture.debugElement.nativeElement.querySelectorAll(
        '.sgfidm-dashboard-organism__acciones-lista button',
      ),
    );
    const porTexto = (texto: string) =>
      botones.find((b) => b.textContent?.includes(texto)) as HTMLButtonElement;

    porTexto('Nueva venta').click();
    expect(spy).toHaveBeenCalledWith(['/pos']);
    porTexto('Agregar producto').click();
    expect(spy).toHaveBeenCalledWith(['/productos/registrar']);
    porTexto('Registrar gasto').click();
    expect(spy).toHaveBeenCalledWith(['/finanzas/gastos/registrar']);
    porTexto('Ver reportes').click();
    expect(spy).toHaveBeenCalledWith(['/reportes']);
    spy.mockRestore();
  });

  it('should show the closed-caja card and open the ABRIR CAJA flow', () => {
    localStorage.removeItem('sgfidm-caja-abierta');
    const sinCaja = TestBed.createComponent(SgfidmDashboardOrganismComponent);
    sinCaja.componentRef.setInput('indicators', []);
    sinCaja.detectChanges();
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const texto = sinCaja.nativeElement.textContent;
    expect(texto).toContain('Caja cerrada');
    expect(texto).toContain('Requiere apertura');
    expect(texto).toContain('Abrir caja');
    expect(texto).not.toContain('Cerrar caja');

    const abrir = Array.from(
      sinCaja.nativeElement.querySelectorAll(
        '.sgfidm-dashboard-organism__caja-acciones button',
      ),
    ).find((b) => (b as HTMLElement).textContent?.includes('Abrir caja')) as HTMLButtonElement;
    abrir.click();
    expect(spy).toHaveBeenCalledWith(['/caja/abrir']);
    spy.mockRestore();
    localStorage.setItem('sgfidm-caja-abierta', '{}');
  });

  it('should show the open-caja card with POS and close actions', () => {
    const texto = fixture.debugElement.nativeElement.textContent;
    expect(texto).toContain('Caja abierta');
    expect(texto).toContain('Puedes vender ahora');
    expect(texto).toContain('Ir al POS');
    expect(texto).toContain('Cerrar caja');
  });

  it('should render the INICIO-03 empty-state variant', () => {
    fixture.componentRef.setInput('estadoVacio', true);
    fixture.detectChanges();
    const texto = fixture.debugElement.nativeElement.textContent;
    expect(texto).toContain('Sin alertas por ahora');
    expect(texto).toContain('Todo en orden por ahora.');
    expect(texto).toContain('Si algo lo requiere, aparecerá aquí.');
    expect(texto).toContain('Aún no hay actividad registrada.');
    expect(texto).toContain('Las ventas, gastos y movimientos aparecerán aquí.');
    expect(texto).not.toContain('Productos con bajo stock');
    expect(fixture.debugElement.queryAll(By.css('sgfidm-empty-state'))).toHaveLength(2);
  });

  it('should offer a way out of the empty states', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.componentRef.setInput('estadoVacio', true);
    fixture.detectChanges();
    const botones: HTMLButtonElement[] = Array.from(
      fixture.debugElement.nativeElement.querySelectorAll('sgfidm-empty-state button'),
    );
    botones[0].click();
    expect(spy).toHaveBeenCalledWith(['/productos/registrar']);
    botones[1].click();
    expect(spy).toHaveBeenCalledWith(['/pos']);
    spy.mockRestore();
  });

  it('should render the indicators grid', () => {
    const grid = fixture.debugElement.query(By.css('.sgfidm-dashboard-organism__indicators-grid'));
    expect(grid).toBeTruthy();
  });

  it('should open the recent activity drawer with filters (INICIO-06)', () => {
    component.abrirActividad();
    fixture.detectChanges();

    const drawer = fixture.debugElement.query(By.css('.sgfidm-dashboard-organism__drawer'));
    expect(drawer).toBeTruthy();
    const text = drawer.nativeElement.textContent;
    expect(text).toContain('Actividad reciente');
    expect(text).toContain('Últimas operaciones de Mi negocio.');
    expect(text).toContain('Venta de mostrador · 3 artículos');
    expect(text).toContain('Últimas 15 operaciones · Solo lectura');
  });

  it('should filter the activity drawer by operation type', () => {
    component.abrirActividad();
    component.seleccionarFiltro('Gastos');
    fixture.detectChanges();

    expect(component.operacionesFiltradas().length).toBe(1);
    expect(fixture.debugElement.nativeElement.textContent).toContain('Compra de bolsas y empaque');
    expect(fixture.debugElement.nativeElement.textContent).not.toContain('Venta de mostrador · 3 artículos');
  });

  it('should render an IndicatorCard per indicator', () => {
    const cards = fixture.debugElement.queryAll(By.css('sgfidm-indicator-card'));
    expect(cards.length).toBe(2);
  });

  it('should render data via IndicatorCard inputs', () => {
    const cards = fixture.debugElement.queryAll(By.css('sgfidm-indicator-card'));
    const eyebrow = cards[0].query(By.css('.sgfidm-indicator-card__eyebrow'));
    expect(eyebrow.nativeElement.textContent).toContain('VENTAS DEL DÍA');
  });
});
