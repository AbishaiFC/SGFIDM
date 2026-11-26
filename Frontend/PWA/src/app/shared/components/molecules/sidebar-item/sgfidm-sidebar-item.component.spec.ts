import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmSidebarItemComponent } from './sgfidm-sidebar-item.component';
import { By } from '@angular/platform-browser';

describe('SgfidmSidebarItemComponent', () => {
  let fixture: ComponentFixture<SgfidmSidebarItemComponent>;
  let component: SgfidmSidebarItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmSidebarItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmSidebarItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'dashboard');
    fixture.componentRef.setInput('label', 'Dashboard');
    fixture.detectChanges();
  });

  it('should render the icon', () => {
    const icon = fixture.debugElement.query(By.css('.sgfidm-sidebar-item__icon'));
    expect(icon.nativeElement.textContent).toContain('dashboard');
  });

  it('should render the label', () => {
    const label = fixture.debugElement.query(By.css('.sgfidm-sidebar-item__label'));
    expect(label.nativeElement.textContent).toContain('Dashboard');
  });

  it('should hide the label in icon-only layout', () => {
    fixture.componentRef.setInput('layout', 'icon-only');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.sgfidm-sidebar-item__label'))).toBeNull();
    const item = fixture.debugElement.query(By.css('button.sgfidm-sidebar-item'));
    expect(item.nativeElement.classList.contains('sgfidm-sidebar-item--icono')).toBe(true);
    expect(item.nativeElement.getAttribute('aria-label')).toBe('Dashboard');
  });

  it('should be default variant when not specified', () => {
    const item = fixture.debugElement.query(By.css('button.sgfidm-sidebar-item'));
    expect(item.nativeElement.classList.contains('sgfidm-sidebar-item--active')).toBe(false);
    expect(item.nativeElement.classList.contains('sgfidm-sidebar-item--disabled')).toBe(false);
  });

  it('should emit nav when clicked', () => {
    let emitted: string | undefined;
    component.nav.subscribe((r) => (emitted = r));
    fixture.componentRef.setInput('route', '/dashboard');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button.sgfidm-sidebar-item'));
    button.triggerEventHandler('click', null);
    expect(emitted).toBe('/dashboard');
  });

  it('should be aria-disabled when disabled', () => {
    fixture.componentRef.setInput('variant', 'disabled');
    fixture.detectChanges();
    const item = fixture.debugElement.query(By.css('button.sgfidm-sidebar-item'));
    expect(item.nativeElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should set aria-current on active', () => {
    fixture.componentRef.setInput('variant', 'active');
    fixture.detectChanges();
    const item = fixture.debugElement.query(By.css('button.sgfidm-sidebar-item'));
    expect(item.nativeElement.getAttribute('aria-current')).toBe('page');
  });
});
