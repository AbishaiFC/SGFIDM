import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { InventarioComponent } from './inventario.component';

describe('InventarioComponent (INV-01 Solo)', () => {
  it('should compose the canonical inventory organism with mock data', async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioComponent, RouterTestingModule],
    }).compileComponents();
    const fixture = TestBed.createComponent(InventarioComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.productos).toHaveLength(8);
    const texto = fixture.debugElement.nativeElement.textContent;
    expect(texto).toContain('Inventario');
    expect(texto).toContain('58 productos · 6 con bajo stock · 2 agotados');
    expect(texto).toContain('Café de altura');
  });

  it('should open the stock detail from a row', async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioComponent, RouterTestingModule],
    }).compileComponents();
    const fixture = TestBed.createComponent(InventarioComponent);
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.componentInstance.onAccion(fixture.componentInstance.productos[0]);
    expect(spy).toHaveBeenCalledWith(['/inventario', 'PROD-018']);
    spy.mockRestore();
  });
});
