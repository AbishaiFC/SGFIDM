// Entorno por defecto (desarrollo con mocks).
// Para usar API real, cambiar el import en app.config.ts a environment.prod
export const environment = {
  production: false,
  useMockData: true,
  apiBaseUrl: 'http://localhost:3000/api',
  pwaEnabled: true,
  sessionInactivityMinutes: 15,
  pinLength: 6,
  maxFailedAttempts: 5,
  defaultBusinessMode: 'independiente',
  implicitBranchCode: 'SUC-001',
};
