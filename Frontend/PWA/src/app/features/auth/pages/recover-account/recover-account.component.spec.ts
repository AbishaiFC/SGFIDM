import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RecoverAccountComponent } from './recover-account.component';

describe('RecoverAccountComponent', () => {
  let component: RecoverAccountComponent;
  let fixture: ComponentFixture<RecoverAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverAccountComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and email field', () => {
    const title = fixture.debugElement.query(By.css('.recover-account-title'));
    expect(title.nativeElement.textContent).toContain('Recupera tu cuenta');
    expect(fixture.debugElement.query(By.css('sgfidm-text-field'))).toBeTruthy();
  });

  it('should render link to login', () => {
    const link = fixture.debugElement.query(By.css('.recover-account-footer a'));
    expect(link).toBeTruthy();
  });
});
