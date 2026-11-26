import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { CajaPendienteComponent } from './caja-pendiente.component';

describe('CajaPendienteComponent (AUTH-14)', () => {
  let fixture: ComponentFixture<CajaPendienteComponent>;
  let component: CajaPendienteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CajaPendienteComponent,
        RouterTestingModule.withRoutes([
          { path: 'dashboard/select-branch', component: CajaPendienteComponent },
          { path: 'caja', component: CajaPendienteComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CajaPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the blocking screen data', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Recupera tu caja pendiente');
    expect(text).toContain('CAJ-002');
    expect(text).toContain('Huérfana');
    expect(text).toContain('Mi negocio · Matriz');
    expect(text).toContain('Hoy, 08:30 AM');
    expect(text).toContain('Venta POS-104 · hoy 09:41');
    expect(text).toContain('Recuperar mi caja');
    expect(text).toContain('Realizar arqueo y cierre');
    expect(text).toContain('Solicitar intervención del propietario');
  });

  it('should go to branch selection when recovering the same cash register', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onRecuperar();
    expect(spy).toHaveBeenCalledWith(['/dashboard/select-branch']);
    spy.mockRestore();
  });

  it('should go to Caja to perform the count and closing', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onArqueoYCierre();
    expect(spy).toHaveBeenCalledWith(['/caja']);
    spy.mockRestore();
  });

  it('should acknowledge the intervention request without closing the cash register', () => {
    component.onSolicitarIntervencion();
    fixture.detectChanges();
    expect(component.solicitudEnviada()).toBe(true);
    expect(fixture.debugElement.nativeElement.textContent).toContain('Solicitud enviada al propietario');
  });
});
