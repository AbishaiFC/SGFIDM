export interface Sesion {
  id: string; // SES-XXX
  empleadoCodigo: string; // EMP-XXX
  rol: string;
  sucursalActiva: string; // SUC-XXX
  inicio: Date;
  expiracion: Date;
  activa: boolean;
}
