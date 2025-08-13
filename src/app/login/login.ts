import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);

  email = '';
  password = '';

  onLoginWithEmail(event: Event) {
    event.preventDefault();
    this.auth.loginWithEmail(this.email, this.password);
  }

  notPassword() {
    this.router.navigate(['/home']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
