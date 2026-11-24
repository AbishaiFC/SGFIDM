import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmDropdownItemComponent } from './sgfidm-dropdown-item.component';
import { By } from '@angular/platform-browser';

describe('SgfidmDropdownItemComponent', () => {
  let fixture: ComponentFixture<SgfidmDropdownItemComponent>;
  let component: SgfidmDropdownItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmDropdownItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmDropdownItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Opcion A');
    fixture.detectChanges();
  });

  it('should render the label', () => {
    const label = fixture.debugElement.query(By.css('.sgfidm-dropdown-item__label'));
    expect(label.nativeElement.textContent).toContain('Opcion A');
  });

  it('should not render icon when empty', () => {
    const icon = fixture.debugElement.query(By.css('.sgfidm-dropdown-item__icon'));
    expect(icon).toBeNull();
  });

  it('should render icon when provided', () => {
    fixture.componentRef.setInput('icon', 'check');
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.sgfidm-dropdown-item__icon'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.textContent).toContain('check');
  });

  it('should emit select when clicked', () => {
    let emitted = false;
    component.select.subscribe(() => (emitted = true));
    const button = fixture.debugElement.query(By.css('button.sgfidm-dropdown-item'));
    button.triggerEventHandler('click', null);
    expect(emitted).toBe(true);
  });

  it('should be aria-disabled when disabled', () => {
    fixture.componentRef.setInput('variant', 'disabled');
    fixture.detectChanges();
    const item = fixture.debugElement.query(By.css('button.sgfidm-dropdown-item'));
    expect(item.nativeElement.getAttribute('aria-disabled')).toBe('true');
  });
});
