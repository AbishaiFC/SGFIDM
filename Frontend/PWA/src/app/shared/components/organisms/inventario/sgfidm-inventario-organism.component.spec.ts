import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  SgfidmInventarioOrganismComponent,
  ProductoInventarioDto,
} from './sgfidm-inventario-organism.component';

describe('SgfidmInventarioOrganismComponent (INV-01 Solo)', () => {
  let fixture: ComponentFixture<SgfidmInventarioOrganismComponent>;
  let component: SgfidmInventarioOrganismComponent;

  const productos: ProductoInventarioDto[] = [
    { id: 'P-001', codigo: 'PROD-018', codigoBarras: '7501031310012', nombre: 'Café de altura', categoria: 'Café y té', costo: '$120.00', precio: '$185.00', stock: 12, stockCritico: 5, estado: 'Con stock' },
    { id: 'P-002', codigo: 'PROD-019', codigoBarras: '7501031310013', nombre: 'Grano de café', categoria: 'Café y té', costo: '$150.00', precio: '$220.00', stock: 3, stockCritico: 8, estado: 'Bajo stock' },
    { id: 'P-003', codigo: 'PROD-022', nombre: 'Taza térmica', categoria: 'Accesorios', costo: '$170.00', precio: '$249.00', stock: 0, stockCritico: 2, estado: 'Agotado' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmInventarioOrganismComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmInventarioOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('productos', productos);
    fixture.componentRef.setInput('totalGeneral', 58);
    fixture.componentRef.setInput('totalBajoStock', 6);
    fixture.componentRef.setInput('totalAgotados', 2);
    fixture.detectChanges();
  });

  it('should render the canonical header, toolbar and table', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Inventario');
    expect(text).toContain('58 productos · 6 con bajo stock · 2 agotados');
    expect(text).toContain('Registrar movimiento');
    expect(
      fixture.debugElement.nativeElement.querySelector('sgfidm-search-bar input')?.getAttribute('placeholder'),
    ).toBe('Código o nombre del producto');
    expect(text).toContain('PRODUCTO');
    expect(text).toContain('PROD-018');
    expect(text).toContain('Café de altura');
    expect(text).toContain('Bajo stock');
    expect(text).toContain('Los productos archivados no aparecen en este listado.');
  });

  it('should filter by search text and by status', () => {
    component.busqueda.set('taza');
    expect(component.filtrados().map((p) => p.nombre)).toEqual(['Taza térmica']);
    component.busqueda.set('');
    component.seleccionarFiltro('Bajo stock');
    expect(component.filtrados().map((p) => p.nombre)).toEqual(['Grano de café']);
  });

  it('should paginate at six rows per page', () => {
    expect(component.porPagina).toBe(6);
    expect(component.totalPaginas()).toBe(1);
    expect(component.rango()).toContain('1–3');
  });

  it('should emit accion on row click', () => {
    let emitido: ProductoInventarioDto | undefined;
    component.accion.subscribe((p) => (emitido = p));
    const fila = fixture.debugElement.nativeElement.querySelector(
      '.sgfidm-inventario-organism__fila',
    ) as HTMLElement;
    fila.click();
    expect(emitido?.id).toBe('P-001');
  });

  it('should show EmptyState when no products (decisión B12)', () => {
    fixture.componentRef.setInput('productos', []);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('sgfidm-empty-state')).toBeTruthy();
  });
});
