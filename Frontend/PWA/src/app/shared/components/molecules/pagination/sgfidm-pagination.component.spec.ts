import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmPaginationComponent } from './sgfidm-pagination.component';

describe('SgfidmPaginationComponent', () => {
  let fixture: ComponentFixture<SgfidmPaginationComponent>;
  let component: SgfidmPaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmPaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('totalPages', 3);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.detectChanges();
  });

  it('should render page numbers for small total', () => {
    const pages = fixture.debugElement.queryAll(By.css('.sgfidm-pagination__page'));
    expect(pages.length).toBeGreaterThanOrEqual(3);
  });

  it('should render active page with aria-current', () => {
    const current = fixture.debugElement.query(By.css('.sgfidm-pagination__page--active'));
    expect(current).toBeTruthy();
    expect(current.nativeElement.getAttribute('aria-current')).toBe('page');
  });

  it('should emit pageChange on next', () => {
    let emitted: number | undefined;
    component.pageChange.subscribe((p) => (emitted = p));
    const next = fixture.debugElement.query(By.css('button[aria-label="Página siguiente"]'));
    next.triggerEventHandler('click', null);
    expect(emitted).toBe(2);
  });

  it('should emit pageChange on prev', () => {
    let emitted: number | undefined;
    component.pageChange.subscribe((p) => (emitted = p));
    fixture.componentRef.setInput('currentPage', 2);
    fixture.detectChanges();
    const prev = fixture.debugElement.query(By.css('button[aria-label="Página anterior"]'));
    prev.triggerEventHandler('click', null);
    expect(emitted).toBe(1);
  });
});
