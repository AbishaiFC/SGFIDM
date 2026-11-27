# Inventario de vistas — Figma vs. documentación (Specs v2.3)

> Fecha: 2026-11-26 · Archivo Figma: `SGFIDM` (`aFdYIAXpAGeMysj6MFqgQI`)
> Páginas analizadas: **PWA/Wireframes** (`786:21743`) y **PWA/Prototype** (`1043:8`)
> Referencia funcional: `Docs/01-Specs/Specs_v2.3.md`
> Alcance actual del desarrollo: **vistas de Administrador en modo Solo**.

## 1. Resumen ejecutivo

| Fuente | Unidades contabilizadas | Detalle |
|---|---:|---|
| PWA/Wireframes | 102 vistas distintas (`Vista · …`) + sus variantes | Organizadas por Rol → Modo → Módulo → Vista → Variantes |
| PWA/Prototype | 198 frames de alto nivel | 14 frames `ADM - Solo`, 113 `ADM - Con Empleados`, 11 `ADM - Con Sucursales`, 31 `ADM /`, 15 `EMP /`, 6 `EMP - Cajero`, 4 `EMP - Almacenista`, 4 `EMP - Supervisor` |
| Código implementado (desarrollo actual) | 30 páginas de feature | Ver §4 |
| Specs v2.3 | ~140 IDs de pantalla/drawer/modal | Catálogo por módulos §3 a §13 |

**Conclusión:** de los 14 frames prototipados para `ADM - Solo`, 12 están implementados y 2
quedan pendientes (uno por revisión de canon). El resto del prototipo corresponde a otros
modos/roles y debe planearse después de cerrar el alcance Solo.

---

## 2. Inventario — PWA/Wireframes (`786:21743`)

Estructura jerárquica: `Rol · …` → `Modo · …` → `Módulo · …` → `Vista · …` → `Grid · Variantes`.

| Módulo (agrupación Figma) | Vistas | Nombres de vista |
|---|---:|---|
| Autenticación y onboarding | 15 | Aceptar invitación · Establecer contraseña · Inicio de sesión · Inicio empleado · Verificación por teléfono · Vincular teléfono · Bienvenida y configuración · Contraseña restablecida · Recuperación enviada · Recuperar cuenta · Registro de cuenta · Restablecer contraseña · Verificación de cuenta · Tour de primer uso · Celebración de primera venta |
| Inicio | 1 | Dashboard |
| Dashboard | 4 | Actividad reciente · Dashboard · Modo edición de widgets · Selector de sucursal (overlay) |
| Caja | 8 | Caja · Abrir caja · Cerrar caja · Detalle de cierre de caja · Historial de cierres · Reporte de caja · Resumen financiero · Sesión activa |
| Ventas y POS | 20 | Terminal de venta · Historial de ventas (filtro fijo EMP-XXX) · Historial de ventas (selector) · Aplicar descuento · Cancelar venta · Comprobante de venta · Detalle de venta · Devoluciones · Generar PDF de comprobante · Historial de ventas · Impresora térmica · POS Terminal · Procesar pago · Reembolso · Reembolso confirmado · Registrar devolución · Venta registrada · Salir del POS · POS-11 — Operaciones pendientes de recuperación · Historial de ventas (Supervisor/Administrador) |
| Inventario y existencias | 10 | Existencias generales · Alertas de stock · Transferencias entre sucursales · Ajustar existencias · Detalle de existencias · Escanear con lector · Exportar historial de movimientos · Historial de movimientos · Movimientos financieros · Registrar movimiento |
| Sucursales | 8 | Monitor de sucursales · Listado de sucursales · Registrar sucursal · Detalle de sucursal · Editar sucursal · Configuración de sucursal · Archivar sucursal · Reactivar sucursal |
| Empleados | 3 | Empleados · EMP-05 — Gestión del empleado · EMP-12 — Acción administrativa de cuenta |
| Auditoría | 2 | Auditoría · Historial de actividad |
| Configuración | 5 | Configuración · Configuración de seguridad · Configuración del negocio · Mi perfil · Métodos de pago |
| Finanzas | 7 | Anular gasto · Análisis de rentabilidad · Detalle de gasto · Gastos · Ingresos · Registrar gasto · Registrar ingreso manual |
| Notificaciones | 4 | Detalle de notificación · Detalle de notificación agregada · Centro de notificaciones · Preferencias de notificaciones |
| Productos y categorías | 10 | Archivar producto · Categorías · Categorías financieras · Detalle de producto · Editar categoría · Editar producto · Nueva categoría financiera · Productos · Registrar categoría · Registro de productos |
| Reportes | 6 | Exportaciones · Exportar reporte · Reporte de finanzas · Reporte de inventario · Reporte de ventas · Reportes |
| **Total** | **102** | Vistas únicas; cada una contiene 1..n variantes de estado (default, vacío, error, etc.) |

---

## 3. Inventario — PWA/Prototype (`1043:8`)

### 3.1. `ADM - Solo` (alcance actual) — 14 frames

| # | Frame prototipado | ID Specs | Estado en código |
|---:|---|---|---|
| 1 | Dashboard - primeros pasos · 0 pasos | INICIO-02 | ✅ Implementado |
| 2 | Dashboard - primeros pasos · 0 pasos (Proto) | INICIO-02 | ✅ Implementado (variante) |
| 3 | Dashboard - operativo | INICIO-03 | ✅ Implementado (tarjeta de caja abierta/cerrada) |
| 4 | Dashboard - operativo · estado vacío | INICIO-03 | ⚠️ Pendiente (variante vacía) |
| 5 | Actividad reciente | INICIO-06 | ✅ Implementado (drawer) |
| 6 | Terminal de venta | POS-01 | ✅ Implementado |
| 7 | Caja | CAJ-01 / CAJ-03 | ✅ Implementado |
| 8 | Abrir caja | CAJ-02 | ✅ Implementado |
| 9 | Cerrar caja | CAJ-03 / CAJ-05 | ✅ Implementado (arqueo) |
| 10 | Registro de productos | PROD-02 | ✅ Implementado |
| 11 | Registrar gasto | FIN-08 | ✅ Implementado (drawer) |
| 12 | Reportes | REP-01 | ✅ Implementado |
| 13 | Existencias generales | INV-01 | ✅ Implementado |
| 14 | Configuración | CONF-01 | ⚠️ Pantalla existente, pendiente de revisar contra el canon |

### 3.2. Otros grupos (fuera del alcance Solo por ahora)

| Grupo | Frames | Observación |
|---|---:|---|
| `ADM - Con Empleados` | 113 | Cubre EMP, PROD, INV, POS, CAJ, FIN, NOT, CONF, auditoría y variantes de estado |
| `ADM - Con Sucursales` | 11 | Dashboard, sucursales, selector, historial de ventas |
| `ADM /` (común) | 31 | AUTH-01..12, onboarding, tour, celebración, modo edición |
| `EMP /` (común) | 15 | AUTH-07..12, invitación y vinculación |
| `EMP - Cajero` | 6 | Dashboard, Caja, Apertura, Cierre, POS, Historial |
| `EMP - Almacenista` | 4 | Dashboard, Existencias, Alertas, Transferencias |
| `EMP - Supervisor` | 4 | Dashboard, Monitor, Empleados, Historial |

Ejemplos representativos del grupo `ADM - Con Empleados`: Empleados, Auditoría (+detalle/vacía/fila
expandida/fallida), Historial de actividad, Sesión activa, Resumen financiero, Ingresos,
Gastos, Anular gasto, Categorías financieras, Detalle de producto (5 pestañas), Editar producto,
Archivar producto, Ajustar existencias, Alertas de stock, Registrar movimiento, Transferencias,
Reporte de ventas/inventario/caja/finanzas, Devoluciones, Reembolso, Centro de notificaciones,
Métodos de pago, Configuración de seguridad.

---

## 4. Estado del código (páginas implementadas en `develop`)

| Módulo | Páginas / rutas | ID Specs |
|---|---|---|
| Auth | login, register, verify-email, recover-account, recovery-sent, reset-password, password-reset-success, terminal-bloqueada, sesion-revocada, caja-pendiente, 7 flujos empleado | AUTH-01..12, AUTH-14, AUTH-16, AUTH-17 |
| Inicio | bienvenida-configuración, primeros-pasos, dashboard, mi-perfil, configuración, select-branch | INICIO-01/02/03/06, AUTH-06, CONF-01 (parcial) |
| POS | pos-terminal | POS-01 |
| Caja | caja, abrir-caja, cerrar-caja | CAJ-01/02/03 |
| Productos | registrar-producto | PROD-02 |
| Finanzas | registrar-gasto | FIN-08 |
| Reportes | reportes | REP-01 |
| Inventario | inventario | INV-01 |

---

## 5. Brechas (Specs v2.3 ↔ prototipo ↔ código)

### 5.1. Prototipado en Solo pero no implementado
- `Dashboard - operativo · estado vacío` (INICIO-03, variante).
- `Configuración` (CONF-01): existe ruta/pantalla, pero sin validación de canon Figma.

### 5.2. Documentado y prototipado (Con Empleados) pero no implementado — candidatos a adaptación Solo
- ~~FIN-01 Resumen financiero~~ ✅ (implementado en esta iteración), FIN-02 Ingresos, FIN-03 Gastos
  (listado), FIN-04 Categorías
  financieras, FIN-05 Movimientos, FIN-06 Análisis de rentabilidad, FIN-07 Registrar ingreso,
  FIN-09 Detalle, FIN-10 Anular.
- ~~PROD-01 Catálogo~~ ✅ (implementado en esta iteración), PROD-03 Detalle (5 pestañas), PROD-04
  ~~PROD-03 Detalle (5 pestañas)~~ ✅, ~~PROD-05 Categorías~~ ✅, PROD-04 Editar, PROD-06 Archivar.
- ~~POS-02 Procesar pago~~ ✅, ~~POS-03 Venta registrada~~ ✅, ~~POS-04 Comprobante~~ ✅,
  POS-05..11 (historial, detalle, cancelación, devoluciones, reembolso, pendientes).
- ~~INV-02 Detalle~~ ✅, ~~INV-03 Registrar movimiento~~ ✅, ~~INV-04 Historial~~ ✅,
  ~~INV-08 Alertas de stock~~ ✅, INV-05..07 y INV-09..12 (ajustes, transferencias).
- REP-02..07 (reportes de ventas/inventario/caja/finanzas, exportaciones y exportar).
- CONF-02..09 (negocio, métodos de pago, seguridad, auditoría, sesiones, cambio de modo).
- NOT-01..03 (centro de notificaciones, detalle, preferencias).

### 5.3. Documentado sin frame explícito en Wireframes (validar)
AUTH-13 (selección de sucursal como paso), AUTH-14 (recuperación de caja), AUTH-15 (PIN como
sección de AUTH-06), CONF-07 (sesiones activas), CONF-09 (confirmar cambio de modo), CONF-11
(comprobantes e impresión). El PIN sí aparece como funcionalidad en AUTH-06/Mi perfil.

### 5.4. Implementado sin prototipo propio en `ADM - Solo`
Los flujos de empleado (AUTH-07..12) y select-branch viven en prototipos de otros roles; se
mantienen como funcionalidad disponible pero **no se muestran en la navegación Solo**.

---

## 6. Orden de creación propuesto (Solo primero)

1. **CONF-01 Configuración (Solo)** — único frame Solo pendiente de revisión/canonización.
2. **INICIO-03 · estado vacío** — variante pendiente del dashboard operativo.
3. **FIN-01 Resumen financiero** — adaptar el prototipo `ADM - Con Empleados` al modo Solo.
4. **PROD-01 Catálogo → PROD-03 Detalle → PROD-05 Categorías** — completar el ciclo de productos
   (ya existe PROD-02).
5. **POS-02 Procesar pago → POS-03 Venta registrada → POS-04 Comprobante** — cerrar el flujo de venta.
6. **INV-02 Detalle → INV-03 Movimiento → INV-04 Historial → INV-08 Alertas** — profundizar inventario.
7. **REP-02..05 + REP-06/07** — reportes específicos y exportación (REP-01 ya listo).
8. **Solo después:** módulos exclusivos de otros modos (SUC, EMP, transferencias, auditoría,
   vistas por rol, notificaciones).

> Regla de trabajo vigente: una vista/patrón por rama → build + tests → push → aprobación de
> GitHub Actions → merge a `develop`. Para cada vista se reutiliza el componente de mayor orden
> del Design System disponible y se dejan ToDo para funcionalidades de otros modos.

---

## 7. Trazabilidad

- PWA/Wireframes: https://www.figma.com/design/aFdYIAXpAGeMysj6MFqgQI/SGFIDM?node-id=786-21743
- PWA/Prototype: https://www.figma.com/design/aFdYIAXpAGeMysj6MFqgQI/SGFIDM?node-id=1043-8
- Ficha Sidebar: https://www.figma.com/design/aFdYIAXpAGeMysj6MFqgQI/SGFIDM?node-id=366-15636
- Catálogo funcional: `Specs_v2.3.md` §§3–13.
