import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { VerifyEmailComponent } from './features/auth/pages/verify-email/verify-email.component';
import { RecoverAccountComponent } from './features/auth/pages/recover-account/recover-account.component';
import { RecoverySentComponent } from './features/auth/pages/recovery-sent/recovery-sent.component';
import { ResetPasswordComponent } from './features/auth/pages/reset-password/reset-password.component';

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
