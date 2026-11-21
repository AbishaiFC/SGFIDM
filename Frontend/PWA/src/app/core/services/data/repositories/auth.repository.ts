import { Observable } from 'rxjs';
import { Usuario } from '../../../../models/usuario.model';
import { Sesion } from '../../../../models/sesion.model';

/**
 * Contrato del repositorio de Autenticación.
 */
export abstract class AuthRepository {
  abstract login(correo: string, password: string): Observable<Sesion>;
  abstract loginEmpleado(codigo: string, password: string): Observable<Sesion>;
  abstract verificarOTP(codigo: string, otp: string): Observable<Sesion>;
  abstract crearCuenta(datos: { nombre: string; correo: string; password: string }): Observable<Sesion>;
  abstract recuperarContrasena(correo: string): Observable<void>;
  abstract restablecerContrasena(token: string, nuevaPassword: string): Observable<void>;
  abstract cerrarSesion(): Observable<void>;
  abstract obtenerUsuarioActual(): Observable<Usuario | null>;
  abstract obtenerSesionActual(): Observable<Sesion | null>;
  abstract estaAutenticado(): Observable<boolean>;
}
