import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { vi } from 'vitest';
import { RegisterComponent } from './register.component';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import { AuthMockRepository } from '../../../../../app/core/services/data/mock/auth.mock.repository';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule],
      providers: [{ provide: AuthRepository, useClass: AuthMockRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the auth card with the register title', () => {
    const card = fixture.debugElement.query(By.css('.sgfidm-auth-card'));
    expect(card).toBeTruthy();
    const title = card.nativeElement.textContent;
    expect(title).toContain('Registro de cuenta');
  });

  it('should call crearCuenta on register click', () => {
    component.email = 'a@b.com';
    component.password = 'pass1234';
    const auth = TestBed.inject(AuthRepository) as AuthRepository;
    const spy = vi.spyOn(auth, 'crearCuenta').mockReturnValue({ subscribe: () => ({}) } as never);
    component.onRegister();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
