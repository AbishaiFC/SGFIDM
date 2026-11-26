import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmAuthCardComponent } from './sgfidm-auth-card.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

// Host de prueba para verificar ng-content
@Component({
  standalone: true,
  imports: [SgfidmAuthCardComponent],
  template: `
    <sgfidm-auth-card title="Iniciar sesión" subtitle="Accede con tu cuenta">
      <span class="projected-content">Contenido proyectado</span>
    </sgfidm-auth-card>
  `,
})
class TestHostComponent {}

describe('SgfidmAuthCardComponent', () => {
  let fixture: ComponentFixture<SgfidmAuthCardComponent>;
  let component: SgfidmAuthCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmAuthCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmAuthCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Iniciar sesión');
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-auth-card__title'));
    expect(title.nativeElement.textContent).toContain('Iniciar sesión');
  });

  it('should not render subtitle when not provided', () => {
    const subtitle = fixture.debugElement.query(By.css('.sgfidm-auth-card__subtitle'));
    expect(subtitle).toBeNull();
  });

  it('should render subtitle when provided', () => {
    fixture.componentRef.setInput('subtitle', 'Accede con tu cuenta');
    fixture.detectChanges();
    const subtitle = fixture.debugElement.query(By.css('.sgfidm-auth-card__subtitle'));
    expect(subtitle).toBeTruthy();
    expect(subtitle.nativeElement.textContent).toContain('Accede con tu cuenta');
  });

  it('should render logo by default', () => {
    const logo = fixture.debugElement.query(By.css('.sgfidm-auth-card__logo'));
    expect(logo).toBeTruthy();
  });

  it('should render logoText', () => {
    const logo = fixture.debugElement.query(By.css('.sgfidm-auth-card__logo-text'));
    expect(logo.nativeElement.textContent.trim()).toBe('SGFIDM');
  });

  it('should use custom logoText when provided', () => {
    fixture.componentRef.setInput('logoText', 'Mi Negocio');
    fixture.detectChanges();
    const logo = fixture.debugElement.query(By.css('.sgfidm-auth-card__logo-text'));
    expect(logo.nativeElement.textContent.trim()).toBe('Mi Negocio');
  });

  it('should hide logo when showLogo is false', () => {
    fixture.componentRef.setInput('showLogo', false);
    fixture.detectChanges();
    const logo = fixture.debugElement.query(By.css('.sgfidm-auth-card__logo'));
    expect(logo).toBeNull();
  });

  it('should apply the wide AUTH variant when requested', () => {
    fixture.componentRef.setInput('wide', true);
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.sgfidm-auth-card'));
    expect(card.nativeElement.classList.contains('sgfidm-auth-card--wide')).toBe(true);
  });

  it('should have role main on the card wrapper', () => {
    const card = fixture.debugElement.query(By.css('.sgfidm-auth-card'));
    expect(card.nativeElement.getAttribute('role')).toBe('main');
  });
});

describe('SgfidmAuthCardComponent — ng-content projection', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should project content into the card', () => {
    const projected = hostFixture.debugElement.query(By.css('.projected-content'));
    expect(projected).toBeTruthy();
    expect(projected.nativeElement.textContent).toContain('Contenido proyectado');
  });
});
