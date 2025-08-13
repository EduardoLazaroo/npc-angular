import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { ApiService, NPC } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  npcs: NPC[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadNPCs();
  }

  loadNPCs(): void {
    this.api.getNPCs().subscribe({
      next: (data) => (this.npcs = data),
      error: (err) => console.error('Erro ao carregar NPCs', err),
    });
  }

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
