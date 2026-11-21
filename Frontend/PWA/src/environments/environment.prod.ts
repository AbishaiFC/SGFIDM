export const environment = {
  production: true,
  // Capa de datos: API real en producción
  useMockData: false,
  apiBaseUrl: 'https://api.sgfidm.com/api',
  // Configuración PWA
  pwaEnabled: true,
  // Seguridad
  sessionInactivityMinutes: 15,
  pinLength: 6,
  maxFailedAttempts: 5,
  // Modo del negocio
  defaultBusinessMode: 'independiente',
  // Identificadores estables
  implicitBranchCode: 'SUC-001',
};
