import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmP4ConfirmacionDestructivaComponent } from './sgfidm-p4-confirmacion-destructiva.component';
import { SharedModule } from '../../../../shared.module';

describe('SgfidmP4ConfirmacionDestructivaComponent', () => {
  let component: SgfidmP4ConfirmacionDestructivaComponent;
  let fixture: ComponentFixture<SgfidmP4ConfirmacionDestructivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmP4ConfirmacionDestructivaComponent, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmP4ConfirmacionDestructivaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', '¿Eliminar producto?');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title via dialog', () => {
    const dialog = fixture.debugElement.query(By.css('.sgfidm-dialog'));
    expect(dialog).toBeTruthy();
    expect(dialog.nativeElement.textContent).toContain('¿Eliminar producto?');
  });

  it('should emit confirm on dialog confirm click', () => {
    let confirmed = false;
    component.confirm.subscribe(() => (confirmed = true));
    const dialog = fixture.debugElement.query(By.css('.sgfidm-dialog'));
    const confirmBtn = dialog.nativeElement.querySelector('.sgfidm-dialog__btn--primary');
    confirmBtn.click();
    fixture.detectChanges();
    expect(confirmed).toBeTruthy();
  });
});
