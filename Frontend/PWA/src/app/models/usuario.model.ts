export interface Usuario {
  codigo: string; // EMP-XXX, inmutable
  nombre: string;
  rol: 'Administrador' | 'Cajero' | 'Almacenista' | 'Supervisor' | string;
  correo?: string;
  telefono?: string;
  sucursales: string[]; // codigos SUC-XXX
  cuentaBloqueada: boolean;
  intentosFallidos: number;
}
