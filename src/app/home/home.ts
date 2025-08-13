import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ApiService, NPC } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  npcs: NPC[] = [];
  selectedNPC: NPC | null = null;
  storyLog: any[] = [];
  newNPC: Partial<NPC> = {};
  searchTerm = '';
  userMessage = '';
  userName = '';
  menuOpen = false;

  api = inject(ApiService);
  auth = inject(AuthService);

  ngOnInit(): void {
    this.loadNPCs();
  }

  get user() {
    return this.auth.getUser?.();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.auth.logout();
  }

  loadNPCs() {
    this.api.getNPCs().subscribe({
      next: (data) => (this.npcs = data),
      error: (err) => console.error('Erro ao carregar NPCs', err),
    });
  }

  registerNPC() {
    this.api.registerNPC(this.newNPC).subscribe({
      next: (res) => {
        console.log(res);
        this.loadNPCs();
        this.newNPC = {};
      },
      error: (err) => console.error('Erro ao cadastrar NPC', err),
    });
  }

  selectNPC(event: Event) {
    const target = event.target as HTMLSelectElement;
    const npcName = target.value;
    if (!npcName) return;

    this.api.getNPCByName(npcName).subscribe({
      next: (npc) => {
        this.selectedNPC = npc;
        this.loadStory();
      },
      error: (err) => console.error('Erro ao carregar NPC', err),
    });
  }

  loadStory() {
    if (!this.selectedNPC) return;
    this.api.getStoryLog(this.selectedNPC.name).subscribe({
      next: (data) => (this.storyLog = data),
      error: (err) => console.error('Erro ao carregar histórico', err),
    });
  }

  sendMessage() {
    if (!this.selectedNPC || !this.userMessage) return;

    const sender = this.userName || 'Usuário';

    this.api
      .interactNPC(sender, this.selectedNPC.name, this.userMessage)
      .subscribe({
        next: (interaction) => {
          this.storyLog.push(interaction);
          this.userMessage = '';
        },
        error: (err) => console.error('Erro ao enviar mensagem', err),
      });
  }

  searchNPC() {
    if (!this.searchTerm) return;

    this.api.searchNPC(this.searchTerm).subscribe({
      next: (npc) => {
        console.log('NPC gerado:', npc);
        this.loadNPCs();
      },
      error: (err) => console.error('Erro ao buscar NPC', err),
    });
  }
}
