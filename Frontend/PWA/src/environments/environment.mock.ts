export const environment = {
  production: false,
  // Capa de datos: MOCK activo por defecto. Cambiar a false para consumir API real.
  useMockData: true,
  apiBaseUrl: 'http://localhost:3000/api',
  // Configuración PWA
  pwaEnabled: true,
  // Seguridad
  sessionInactivityMinutes: 15, // B9/B10: 15 min por defecto, 45 configurable
  pinLength: 6, // AUTH-15: 6 dígitos
  maxFailedAttempts: 5, // C4: 5 intentos fallidos
  // Modo del negocio
  defaultBusinessMode: 'independiente',
  // Identificadores estables
  implicitBranchCode: 'SUC-001', // E10: sucursal implícita
};
