import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  auth = inject(AuthService);
  menuOpen = false;

  get user() {
    return this.auth.getUser?.();
  }

  logout() {
    this.auth.logout();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
