import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: '../login/login.scss'
})
export class RegisterComponent {
  auth = inject(AuthService);
  router = inject(Router);

  email = '';
  password = '';

  onRegister(event: Event) {
    event.preventDefault();
    this.auth.registerWithEmail(this.email, this.password);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
