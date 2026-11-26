import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { ConfiguracionComponent } from './configuracion.component';

describe('ConfiguracionComponent (CONF-01)', () => {
  let fixture: ComponentFixture<ConfiguracionComponent>;
  let component: ConfiguracionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfiguracionComponent,
        RouterTestingModule.withRoutes([
          { path: 'dashboard/configuracion/mi-perfil', component: ConfiguracionComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hub title, subtitle and the nine configuration rows', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Configuración');
    expect(text).toContain('Administra tu negocio, la seguridad y los métodos de pago.');
    expect(text).toContain('Negocio');
    expect(text).toContain('Seguridad');
    expect(text).toContain('Mi perfil');
    expect(text).toContain('Auditoría');
    expect(fixture.debugElement.queryAll(By.css('.configuracion-row')).length).toBe(9);
  });

  it('should enable only the Mi perfil destination', () => {
    const botones = fixture.debugElement.queryAll(By.css('sgfidm-button button'));
    const habilitados = botones.filter((b) => !b.nativeElement.disabled);
    expect(habilitados.length).toBe(1);
    expect(botones[7].nativeElement.disabled).toBe(false);
  });

  it('should navigate to Mi perfil from its row', async () => {
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.abrir(component.opciones[7]);
    expect(spy).toHaveBeenCalledWith('/dashboard/configuracion/mi-perfil');

    spy.mockRestore();
  });
});
