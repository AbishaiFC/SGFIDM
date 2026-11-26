import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { RecoverAccountComponent } from './pages/recover-account/recover-account.component';
import { RecoverySentComponent } from './pages/recovery-sent/recovery-sent.component';

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'recover-account', component: RecoverAccountComponent },
  { path: 'recovery-sent', component: RecoverySentComponent },
];
