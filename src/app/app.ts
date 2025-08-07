import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, AsyncPipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
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
