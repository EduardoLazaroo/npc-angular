import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  auth = inject(AuthService);

  email = '';
  password = '';

  loginWithEmail(event: Event) {
    event.preventDefault();
    this.auth.loginWithEmail(this.email, this.password);
  }

  register() {
    this.auth.registerWithEmail(this.email, this.password);
  }
}
