import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmDialogComponent } from './sgfidm-dialog.component';

describe('SgfidmDialogComponent', () => {
  let fixture: ComponentFixture<SgfidmDialogComponent>;
  let component: SgfidmDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', '¿Confirmar acción?');
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-dialog__title'));
    expect(title.nativeElement.textContent).toContain('¿Confirmar acción?');
  });

  it('should render confirm button by default', () => {
    const confirmBtn = fixture.debugElement.query(By.css('button.sgfidm-dialog__btn--primary:not(.sgfidm-dialog__btn--destructive)'));
    expect(confirmBtn.nativeElement.textContent).toContain('Confirmar');
  });

  it('should emit confirm on primary click', () => {
    let emitted = false;
    component.confirm.subscribe(() => (emitted = true));
    const btn = fixture.debugElement.query(By.css('button.sgfidm-dialog__btn--primary'));
    btn.triggerEventHandler('click', null);
    expect(emitted).toBe(true);
  });

  it('should emit cancel on secondary click', () => {
    let emitted = false;
    component.cancel.subscribe(() => (emitted = true));
    const btn = fixture.debugElement.query(By.css('button.sgfidm-dialog__btn--secondary'));
    btn.triggerEventHandler('click', null);
    expect(emitted).toBe(true);
  });

  it('should set destructive class in destructive variant', () => {
    fixture.componentRef.setInput('variant', 'destructive');
    fixture.detectChanges();
    const dialog = fixture.debugElement.query(By.css('.sgfidm-dialog'));
    expect(dialog.nativeElement.classList.contains('sgfidm-dialog--destructive')).toBe(true);
  });

  it('should use custom labels when provided', () => {
    fixture.componentRef.setInput('confirmLabel', 'Hazlo');
    fixture.componentRef.setInput('cancelLabel', 'Nopes');
    fixture.detectChanges();
    const confirmBtn = fixture.debugElement.query(By.css('button.sgfidm-dialog__btn--primary'));
    const cancelBtn = fixture.debugElement.query(By.css('button.sgfidm-dialog__btn--secondary'));
    expect(confirmBtn.nativeElement.textContent).toContain('Hazlo');
    expect(cancelBtn.nativeElement.textContent).toContain('Nopes');
  });

  it('should hide cancel when showCancel is false', () => {
    fixture.componentRef.setInput('showCancel', false);
    fixture.detectChanges();
    const cancelBtn = fixture.debugElement.query(By.css('button.sgfidm-dialog__btn--secondary'));
    expect(cancelBtn).toBeNull();
  });
});
