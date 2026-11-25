import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SgfidmP6TerminalPosComponent, P6CartRow } from './sgfidm-p6-terminal-pos.component';

describe('SgfidmP6TerminalPosComponent', () => {
  let component: SgfidmP6TerminalPosComponent;
  let fixture: ComponentFixture<SgfidmP6TerminalPosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmP6TerminalPosComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmP6TerminalPosComponent);
    component = fixture.componentInstance;
    component.rows = [
      { id: '1', name: 'Café', quantity: 2, unitPrice: '$ 3.50' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute total', () => {
    expect(component.total).toBe('7.00');
  });

  it('should render cart rows and total', () => {
    const text = fixture.debugElement.query(By.css('.p6-terminal-pos__cart')).nativeElement.textContent;
    expect(text).toContain('Café');
    expect(text).toContain('7.00');
  });

  it('should emit pay on pay button click', () => {
    let paid = false;
    component.pay.subscribe(() => (paid = true));
    const btn = fixture.debugElement.query(By.css('.p6-terminal-pos__actions sgfidm-button:first-of-type'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(paid).toBeTruthy();
  });

  it('should emit addRow on second button click', () => {
    let added = false;
    component.addRow.subscribe(() => (added = true));
    const btns = fixture.debugElement.queryAll(By.css('.p6-terminal-pos__actions sgfidm-button'));
    btns[1].nativeElement.click();
    fixture.detectChanges();
    expect(added).toBeTruthy();
  });
});
