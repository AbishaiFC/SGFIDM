import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmTopBarComponent } from './sgfidm-top-bar.component';

describe('SgfidmTopBarComponent', () => {
  let fixture: ComponentFixture<SgfidmTopBarComponent>;
  let component: SgfidmTopBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmTopBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the default breadcrumb (SGFIDM)', () => {
    const crumbs = fixture.debugElement.queryAll(By.css('.sgfidm-top-bar__crumb'));
    expect(crumbs.length).toBe(1);
    expect(crumbs[0].nativeElement.textContent).toContain('SGFIDM');
  });

  it('should render custom breadcrumbs', () => {
    fixture.componentRef.setInput('breadcrumbs', ['SGFIDM', 'POS', 'Terminal']);
    fixture.detectChanges();
    const crumbs = fixture.debugElement.queryAll(By.css('.sgfidm-top-bar__crumb'));
    expect(crumbs.length).toBe(3);
    expect(crumbs[2].nativeElement.textContent).toContain('Terminal');
  });

  it('should render separators between crumbs', () => {
    fixture.componentRef.setInput('breadcrumbs', ['SGFIDM', 'POS']);
    fixture.detectChanges();
    const seps = fixture.debugElement.queryAll(By.css('.sgfidm-top-bar__crumb-sep'));
    expect(seps.length).toBe(1);
    expect(seps[0].nativeElement.textContent).toContain('/');
  });

  it('should render search bar by default', () => {
    const search = fixture.debugElement.query(By.css('.sgfidm-top-bar__search sgfidm-search-bar'));
    expect(search).toBeTruthy();
  });

  it('should hide search when showSearch is false', () => {
    fixture.componentRef.setInput('showSearch', false);
    fixture.detectChanges();
    const search = fixture.debugElement.query(By.css('.sgfidm-top-bar__search sgfidm-search-bar'));
    expect(search).toBeNull();
  });

  it('should set custom search placeholder', () => {
    fixture.componentRef.setInput('searchPlaceholder', 'Buscar productos…');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('.sgfidm-top-bar__search input[type="search"]'));
    expect(input.nativeElement.getAttribute('placeholder')).toContain('Buscar productos');
  });
});
