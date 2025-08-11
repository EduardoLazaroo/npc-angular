import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  auth = inject(AuthService);

  get user() {
    return this.auth.getUser?.();
  }

  logout() {
    this.auth.logout();
  }
}
