import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SgfidmSearchBarComponent } from './sgfidm-search-bar.component';
import { By } from '@angular/platform-browser';

describe('SgfidmSearchBarComponent', () => {
  let fixture: ComponentFixture<SgfidmSearchBarComponent>;
  let component: SgfidmSearchBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SgfidmSearchBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the placeholder', () => {
    const input = fixture.debugElement.query(By.css('input[type="search"]'));
    expect(input.nativeElement.getAttribute('placeholder')).toContain('Buscar');
  });

  it('should emit search on Enter key', () => {
    let emitted = false;
    component.search.subscribe(() => (emitted = true));
    const input = fixture.debugElement.query(By.css('input[type="search"]'));
    input.triggerEventHandler('keydown', { key: 'Enter' });
    expect(emitted).toBe(true);
  });

  it('should not emit search on other keys', () => {
    let emitted = false;
    component.search.subscribe(() => (emitted = true));
    const input = fixture.debugElement.query(By.css('input[type="search"]'));
    input.triggerEventHandler('keydown', { key: 'a' });
    expect(emitted).toBe(false);
  });

  it('should have role search on wrapper', () => {
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-search-bar'));
    expect(wrapper.nativeElement.getAttribute('role')).toBe('search');
  });
});
