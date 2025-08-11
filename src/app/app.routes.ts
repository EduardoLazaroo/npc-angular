import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Home } from './home/home';
import { authGuard } from '../auth/auth.guard';
import { RegisterComponent } from './register/register';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
