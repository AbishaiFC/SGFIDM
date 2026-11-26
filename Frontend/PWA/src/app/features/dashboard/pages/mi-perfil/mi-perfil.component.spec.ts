import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { MiPerfilComponent } from './mi-perfil.component';
import { AuthRepository } from '../../../../core/services/data/repositories/auth.repository';

describe('MiPerfilComponent (AUTH-06)', () => {
  let fixture: ComponentFixture<MiPerfilComponent>;
  let component: MiPerfilComponent;
  let auth: AuthRepository;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MiPerfilComponent,
        RouterTestingModule.withRoutes([
          { path: 'dashboard/configuracion', component: MiPerfilComponent },
          { path: 'auth/login', component: MiPerfilComponent },
        ]),
      ],
      providers: [{ provide: AuthRepository, useValue: { cerrarSesion: vi.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(MiPerfilComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthRepository);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Figma header, cards and read-only owner data', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Mi perfil');
    expect(text).toContain('Tu cuenta personal en modo Solo.');
    expect(text).toContain('Cuenta del Propietario');
    expect(text).toContain('NOMBRE COMPLETO');
    expect(text).toContain('Ana Martínez');
    expect(text).toContain('ana@minegocio.com');
    expect(text).toContain('MXN · Fija tras el primer movimiento');
    expect(text).toContain('Sesión actual');
    expect(text).toContain('PIN de acceso rápido');
    expect(text).toContain('PIN configurado');
    expect(text).toContain('Accesibilidad y ayuda');
    expect(text).toContain('Desactivado');
    expect(text).toContain('Volver a Configuración');
  });

  it('should navigate back to Configuración', () => {
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onVolver();
    expect(spy).toHaveBeenCalledWith(['/dashboard/configuracion']);
    spy.mockRestore();
  });

  it('should close the session and navigate to login', () => {
    vi.spyOn(auth, 'cerrarSesion').mockReturnValue(of(undefined));
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.onCerrarSesion();

    expect(auth.cerrarSesion).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(['/auth/login']);
    spy.mockRestore();
  });
});
