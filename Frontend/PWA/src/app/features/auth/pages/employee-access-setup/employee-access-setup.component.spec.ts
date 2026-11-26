import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { EmployeeAccessSetupComponent } from './employee-access-setup.component';

describe('EmployeeAccessSetupComponent (AUTH-09)', () => {
  let fixture: ComponentFixture<EmployeeAccessSetupComponent>;
  let component: EmployeeAccessSetupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAccessSetupComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAccessSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and offer both first-access options', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Configuración de acceso');
    expect(text).toContain('Vincular teléfono');
    expect(text).toContain('Establecer contraseña');
  });

  it('should navigate to link phone', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onVincularTelefono();
    expect(spy).toHaveBeenCalledWith(['/auth/employee/link-phone']);
    spy.mockRestore();
  });

  it('should navigate to set password', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onEstablecerContrasena();
    expect(spy).toHaveBeenCalledWith(['/auth/employee/set-password']);
    spy.mockRestore();
  });
});
