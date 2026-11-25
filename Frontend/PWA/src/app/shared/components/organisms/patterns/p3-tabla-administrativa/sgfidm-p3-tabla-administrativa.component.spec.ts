import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmP3TablaAdministrativaComponent, P3Row } from './sgfidm-p3-tabla-administrativa.component';
import { SharedModule } from '../../../../shared.module';
import { FormsModule } from '@angular/forms';

describe('SgfidmP3TablaAdministrativaComponent', () => {
  let component: SgfidmP3TablaAdministrativaComponent;
  let fixture: ComponentFixture<SgfidmP3TablaAdministrativaComponent>;

  const mockRows: P3Row[] = [
    { id: '1', nombre: 'Item 1', precio: '10' },
    { id: '2', nombre: 'Item 2', precio: '20' },
    { id: '3', nombre: 'Item 3', precio: '15' },
    { id: '4', nombre: 'Item 4', precio: '30' },
    { id: '5', nombre: 'Item 5', precio: '25' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmP3TablaAdministrativaComponent, SharedModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmP3TablaAdministrativaComponent);
    component = fixture.componentInstance;
    component.columns = ['nombre', 'precio'];
    component.rows = mockRows;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paginate rows by pageSize', () => {
    component.pageSize = 2;
    fixture.detectChanges();
    expect(component.pageRows.length).toBe(2);
    expect(component.totalPages).toBe(3);
  });

  it('should slice rows for current page', () => {
    expect(component.pageRows).toEqual(mockRows.slice(0, 10));
  });

  it('should emit action on row click', () => {
    let emitted: { id: string } | undefined;
    component.action.subscribe((e) => (emitted = e));
    const btns = fixture.debugElement.queryAll(By.css('tbody .sgfidm-button'));
    expect(btns.length).toBe(mockRows.length);
    btns[0].triggerEventHandler('click', null);
    expect(emitted?.id).toBe('1');
  });

  it('should emit sort change on header click', () => {
    let emitted: string | undefined;
    component.sortChange.subscribe((s) => (emitted = s));
    const ths = fixture.debugElement.queryAll(By.css('thead th'));
    ths[0].triggerEventHandler('click', null);
    expect(emitted).toBe('nombre');
  });

  it('should mark sorted column', () => {
    component.onSort('precio');
    expect(component.sortedColumn).toBe('precio');
  });
});
