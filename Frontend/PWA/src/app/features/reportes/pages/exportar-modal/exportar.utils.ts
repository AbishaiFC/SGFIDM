import { ExportacionSolicitud } from './exportar-modal.component';

/** Registra los metadatos de la exportación para REP-06 (sin almacenar archivos). */
export function registrarExportacion(solicitud: ExportacionSolicitud): void {
  try {
    const historial = JSON.parse(localStorage.getItem('sgfidm-exportaciones') || '[]');
    localStorage.setItem(
      'sgfidm-exportaciones',
      JSON.stringify([
        ...historial,
        {
          id: `EXP-${String(historial.length + 15).padStart(3, '0')}`,
          reporte: solicitud.reporte,
          formato: solicitud.formato.includes('Excel') ? 'XLSX' : 'CSV',
          separador: solicitud.separador,
          filas: solicitud.filas,
          estado: 'COMPLETADA',
          fecha: new Date().toISOString(),
        },
      ]),
    );
  } catch {
    // Sin almacenamiento: la exportación queda solo en memoria.
  }
}
