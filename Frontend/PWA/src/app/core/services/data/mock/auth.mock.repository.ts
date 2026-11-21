import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthRepository } from '../repositories/auth.repository';
import { Usuario } from '../../../../models/usuario.model';
import { Sesion } from '../../../../models/sesion.model';

export class AuthMockRepository implements AuthRepository {
  private sesionActual: Sesion | null = null;
  private usuarioActual: Usuario | null = null;

  login(correo: string, password: string): Observable<Sesion> {
    // Mock: acepta cualquier correo con password válida
    const sesion: Sesion = {
      id: 'SES-001',
      empleadoCodigo: 'EMP-001',
      rol: 'Administrador',
      sucursalActiva: 'SUC-001',
      inicio: new Date(),
      expiracion: new Date(Date.now() + 30 * 60 * 1000),
      activa: true,
    };
    this.sesionActual = sesion;
    this.usuarioActual = {
      codigo: 'EMP-001',
      nombre: 'Administrador',
      rol: 'Administrador',
      correo: correo,
      telefono: '',
      sucursales: ['SUC-001'],
      cuentaBloqueada: false,
      intentosFallidos: 0,
    };
    return of(sesion).pipe(delay(600));
  }

  loginEmpleado(codigo: string, password: string): Observable<Sesion> {
    const sesion: Sesion = {
      id: 'SES-002',
      empleadoCodigo: codigo,
      rol: 'Cajero',
      sucursalActiva: 'SUC-001',
      inicio: new Date(),
      expiracion: new Date(Date.now() + 30 * 60 * 1000),
      activa: true,
    };
    this.sesionActual = sesion;
    this.usuarioActual = {
      codigo,
      nombre: 'Cajero',
      rol: 'Cajero',
      correo: '',
      telefono: '',
      sucursales: ['SUC-001'],
      cuentaBloqueada: false,
      intentosFallidos: 0,
    };
    return of(sesion).pipe(delay(600));
  }

  verificarOTP(codigo: string, otp: string): Observable<Sesion> {
    return of(this.sesionActual!).pipe(delay(400));
  }

  crearCuenta(datos: { nombre: string; correo: string; password: string }): Observable<Sesion> {
    const sesion: Sesion = {
      id: 'SES-003',
      empleadoCodigo: 'EMP-001',
      rol: 'Administrador',
      sucursalActiva: 'SUC-001',
      inicio: new Date(),
      expiracion: new Date(Date.now() + 30 * 60 * 1000),
      activa: true,
    };
    this.sesionActual = sesion;
    return of(sesion).pipe(delay(800));
  }

  recuperarContrasena(correo: string): Observable<void> {
    return of(undefined).pipe(delay(500));
  }

  restablecerContrasena(token: string, nuevaPassword: string): Observable<void> {
    return of(undefined).pipe(delay(500));
  }

  cerrarSesion(): Observable<void> {
    this.sesionActual = null;
    this.usuarioActual = null;
    return of(undefined).pipe(delay(300));
  }

  obtenerUsuarioActual(): Observable<Usuario | null> {
    return of(this.usuarioActual);
  }

  obtenerSesionActual(): Observable<Sesion | null> {
    return of(this.sesionActual);
  }

  estaAutenticado(): Observable<boolean> {
    return of(!!this.sesionActual);
  }
}
