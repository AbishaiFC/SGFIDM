export interface Producto {
  codigo: string; // PROD-XXX, inmutable
  nombre: string;
  codigoBarras?: string;
  categoria?: string; // CAT-XXX
  descripcion?: string; // Descripción opcional (PROD-02)
  precioVenta: number;
  costoAdquisicion?: number;
  stockMinimo?: number;
  stockActual: number;
  unidadMedida?: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaActualizacion?: Date;
}
