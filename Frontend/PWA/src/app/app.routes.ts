import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { VerifyEmailComponent } from './features/auth/pages/verify-email/verify-email.component';
import { RecoverAccountComponent } from './features/auth/pages/recover-account/recover-account.component';
import { RecoverySentComponent } from './features/auth/pages/recovery-sent/recovery-sent.component';
import { ResetPasswordComponent } from './features/auth/pages/reset-password/reset-password.component';
import { EmployeeLoginComponent } from './features/auth/pages/employee-login/employee-login.component';
import { EmployeeVerifyPhoneComponent } from './features/auth/pages/employee-verify-phone/employee-verify-phone.component';
import { EmployeeAccessSetupComponent } from './features/auth/pages/employee-access-setup/employee-access-setup.component';
import { EmployeeLinkPhoneComponent } from './features/auth/pages/employee-link-phone/employee-link-phone.component';
import { EmployeeSetPasswordComponent } from './features/auth/pages/employee-set-password/employee-set-password.component';
import { EmployeeAcceptInvitationComponent } from './features/auth/pages/employee-accept-invitation/employee-accept-invitation.component';
import { CajaPendienteComponent } from './features/auth/pages/caja-pendiente/caja-pendiente.component';
import { TerminalBloqueadaComponent } from './features/auth/pages/terminal-bloqueada/terminal-bloqueada.component';
import { SesionRevocadaComponent } from './features/auth/pages/sesion-revocada/sesion-revocada.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'recover-account', component: RecoverAccountComponent },
      { path: 'recovery-sent', component: RecoverySentComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'employee/login', component: EmployeeLoginComponent },
      { path: 'employee/verify-phone', component: EmployeeVerifyPhoneComponent },
      { path: 'employee/access-setup', component: EmployeeAccessSetupComponent },
      { path: 'employee/link-phone', component: EmployeeLinkPhoneComponent },
      { path: 'employee/set-password', component: EmployeeSetPasswordComponent },
      { path: 'employee/accept-invitation', component: EmployeeAcceptInvitationComponent },
      { path: 'caja-pendiente', component: CajaPendienteComponent },
      { path: 'terminal-bloqueada', component: TerminalBloqueadaComponent },
      { path: 'sesion-revocada', component: SesionRevocadaComponent },
    ],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  {
    path: 'pos',
    loadChildren: () => import('./features/pos/pos.routes').then((m) => m.posRoutes),
  },
  {
    path: 'caja',
    loadChildren: () => import('./features/caja/caja.routes').then((m) => m.cajaRoutes),
  },
  { path: '**', redirectTo: '/auth/login' },
];
