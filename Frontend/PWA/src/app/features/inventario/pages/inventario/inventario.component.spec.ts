import { TestBed } from '@angular/core/testing';
import { InventarioComponent } from './inventario.component';

describe('InventarioComponent (INV-01 Solo)', () => {
  it('should compose the canonical inventory organism with mock data', async () => {
    await TestBed.configureTestingModule({ imports: [InventarioComponent] }).compileComponents();
    const fixture = TestBed.createComponent(InventarioComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.productos).toHaveLength(8);
    const texto = fixture.debugElement.nativeElement.textContent;
    expect(texto).toContain('Inventario');
    expect(texto).toContain('58 productos · 6 con bajo stock · 2 agotados');
    expect(texto).toContain('Café de altura');
  });
});
