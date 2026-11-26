import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { SelectBranchComponent } from './select-branch.component';

function configurar(modo?: string): ComponentFixture<SelectBranchComponent> {
  TestBed.configureTestingModule({
    imports: [
      SelectBranchComponent,
      RouterTestingModule.withRoutes([
        { path: 'dashboard', component: SelectBranchComponent },
        { path: 'dashboard/configuracion', component: SelectBranchComponent },
      ]),
    ],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { queryParamMap: convertToParamMap(modo ? { modo } : {}) },
        },
      },
    ],
  });
  const fixture = TestBed.createComponent(SelectBranchComponent);
  fixture.detectChanges();
  return fixture;
}

describe('SelectBranchComponent (AUTH-13)', () => {
  it('should create and list the three branches', () => {
    const fixture = configurar();
    const text = fixture.debugElement.nativeElement.textContent;
    expect(fixture.componentInstance).toBeTruthy();
    expect(text).toContain('Seleccionar sucursal');
    expect(text).toContain('SUC-001');
    expect(text).toContain('SUC-002');
    expect(text).toContain('SUC-003');
    expect(text).toContain('Volver a Configuración');
  });

  it('should use the Figma filter subtitle in filter mode', () => {
    const fixture = configurar('filtro');
    expect(fixture.componentInstance.esFiltro).toBe(true);
    expect(fixture.componentInstance.subtitulo).toBe('Filtro de consulta, no contexto operativo');
  });

  it('should navigate to the dashboard with the selected active branch', () => {
    const fixture = configurar();
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.componentInstance.seleccionar('SUC-002');
    fixture.componentInstance.onContinuar();
    expect(spy).toHaveBeenCalledWith(['/dashboard'], {
      state: { sucursalActiva: 'SUC-002' },
    });
    spy.mockRestore();
  });

  it('should not continue without a selection', () => {
    const fixture = configurar();
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.componentInstance.onContinuar();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
