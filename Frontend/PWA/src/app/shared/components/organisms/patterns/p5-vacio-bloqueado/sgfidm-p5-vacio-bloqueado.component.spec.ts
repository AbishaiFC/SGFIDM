import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmP5VacioBloqueadoComponent } from './sgfidm-p5-vacio-bloqueado.component';
import { SharedModule } from '../../../../shared.module';

describe('SgfidmP5VacioBloqueadoComponent', () => {
  let component: SgfidmP5VacioBloqueadoComponent;
  let fixture: ComponentFixture<SgfidmP5VacioBloqueadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmP5VacioBloqueadoComponent, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmP5VacioBloqueadoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Sin movimientos');
    fixture.componentRef.setInput('actionLabel', 'Registrar movimiento');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title through EmptyState', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-empty-state__title'));
    expect(title.nativeElement.textContent).toContain('Sin movimientos');
  });

  it('should emit action via empty state primary button', () => {
    let actionFired = false;
    component.action.subscribe(() => (actionFired = true));
    const actionBtn = fixture.debugElement.query(By.css('.sgfidm-empty-state__action'));
    actionBtn.nativeElement.click();
    fixture.detectChanges();
    expect(actionFired).toBeTruthy();
  });

  it('should emit contact', () => {
    let contactFired = false;
    component.contact.subscribe(() => (contactFired = true));
    const contactBtn = fixture.debugElement.query(By.css('.p5-vacio-bloqueado__contact button'));
    contactBtn.nativeElement.click();
    fixture.detectChanges();
    expect(contactFired).toBeTruthy();
  });
});
