import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SgfidmProductosOrganismComponent, ProductoCatalogDto } from './sgfidm-productos-organism.component';

describe('SgfidmProductosOrganismComponent (PROD-01 Solo)', () => {
  let fixture: ComponentFixture<SgfidmProductosOrganismComponent>;
  let component: SgfidmProductosOrganismComponent;

  const productos: ProductoCatalogDto[] = [
    { id: 'P-018', codigo: 'PROD-018', codigoBarras: '7501031310012', nombre: 'Café de altura', categoria: 'Café y té', precioVenta: '$185.00', costo: '$92.00', existencias: 12, status: 'activo' },
    { id: 'P-019', codigo: 'PROD-019', nombre: 'Grano de café', categoria: 'Café y té', precioVenta: '$220.00', costo: '$118.00', existencias: 3, bajoStock: true, status: 'activo' },
    { id: 'P-031', codigo: 'PROD-031', nombre: 'Pan artesanal', categoria: 'Panadería', precioVenta: '$48.00', existencias: 2, bajoStock: true, status: 'activo' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmProductosOrganismComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmProductosOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('productos', productos);
    fixture.componentRef.setInput('totalGeneral', 128);
    fixture.componentRef.setInput('totalActivos', 114);
    fixture.componentRef.setInput('totalBajoStock', 3);
    fixture.detectChanges();
  });

  it('should render the canonical catalog header, toolbar and table', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Productos');
    expect(text).toContain('128 productos · 114 activos · 3 con bajo stock');
    expect(text).toContain('Agregar producto');
    expect(
      fixture.debugElement.nativeElement
        .querySelector('sgfidm-search-bar input')
        ?.getAttribute('placeholder'),
    ).toBe('Buscar producto o código');
    expect(text).toContain('PRODUCTO');
    expect(text).toContain('Café de altura');
    expect(text).toContain('PROD-018');
    expect(text).toContain('Bajo stock');
  });

  it('should filter by search and status', () => {
    component.busqueda.set('pan');
    expect(component.filtrados().map((p) => p.nombre)).toEqual(['Pan artesanal']);
    component.busqueda.set('');
    component.seleccionar('Solo bajo stock');
    expect(component.filtrados().map((p) => p.nombre)).toEqual(['Grano de café', 'Pan artesanal']);
  });

  it('should emit accion on row click', () => {
    let emitido: ProductoCatalogDto | undefined;
    component.accion.subscribe((p) => (emitido = p));
    const fila = fixture.debugElement.nativeElement.querySelector('tbody tr') as HTMLElement;
    fila.click();
    expect(emitido?.codigo).toBe('PROD-018');
  });

  it('should show EmptyState when nothing matches', () => {
    component.busqueda.set('inexistente');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('sgfidm-empty-state')).toBeTruthy();
  });
});
