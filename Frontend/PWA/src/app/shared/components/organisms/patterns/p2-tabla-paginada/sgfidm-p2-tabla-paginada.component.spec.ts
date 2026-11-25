import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmP2TablaPaginadaComponent } from './sgfidm-p2-tabla-paginada.component';
import { SharedModule } from '../../../../shared.module';

describe('SgfidmP2TablaPaginadaComponent', () => {
  let component: SgfidmP2TablaPaginadaComponent;
  let fixture: ComponentFixture<SgfidmP2TablaPaginadaComponent>;

  const mockItems = [
    { id: '1', nombre: 'Item 1', precio: '10', stock: 5 },
    { id: '2', nombre: 'Item 2', precio: '20', stock: 3 },
    { id: '3', nombre: 'Item 3', precio: '15', stock: 8 },
    { id: '4', nombre: 'Item 4', precio: '30', stock: 2 },
    { id: '5', nombre: 'Item 5', precio: '25', stock: 6 },
    { id: '6', nombre: 'Item 6', precio: '12', stock: 7 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmP2TablaPaginadaComponent, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmP2TablaPaginadaComponent);
    component = fixture.componentInstance;
    component.items = mockItems;
    component.page = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages correctly', () => {
    expect(component.totalPages).toBe(Math.ceil(mockItems.length / component.pageSize));
  });

  it('should slice items for current page', () => {
    const expected = mockItems.slice(0, component.pageSize);
    expect(component.pageItems).toEqual(expected);
  });

  it('should update page on pagination change', () => {
    const newPage = 1;
    component.onPageChange(newPage);
    expect(component.page).toBe(newPage);
  });
});
