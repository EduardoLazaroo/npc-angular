import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ApiService, NPC } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
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
  loadingStory = false;
  sendingMessage = false;
  selectedNPCName = '';

  api = inject(ApiService);
  auth = inject(AuthService);
  cdr = inject(ChangeDetectorRef);

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

  selectNPC(npcName: string) {
    if (!npcName) return;
    const npc = this.npcs.find((n) => n.name === npcName);
    if (npc) {
      this.selectedNPC = npc;
      this.storyLog = [];
      this.loadStory(npc.name);
    }
  }

  onNPCSelected(npc: NPC | null) {
    if (!npc) return;
    this.selectedNPC = npc;
    this.storyLog = [];
    this.loadingStory = true;
    this.loadStory(npc.name);
  }

  loadStory(npcName?: string) {
    const nameToLoad = npcName || this.selectedNPC?.name;
    if (!nameToLoad) return;

    this.loadingStory = true;

    this.api.getStoryLog(nameToLoad).subscribe({
      next: (data) => {
        this.storyLog = data;
        this.loadingStory = false;
        this.cdr.detectChanges(); // força atualização da UI
      },
      error: (err) => {
        console.error('Erro ao carregar histórico', err);
        this.loadingStory = false;
        this.cdr.detectChanges();
      },
    });
  }

  sendMessage() {
    if (!this.selectedNPC || !this.userMessage || this.sendingMessage) return;

    this.sendingMessage = true;
    const sender = this.userName || 'Usuário';
    const tempInteraction = {
      from: sender,
      to: this.selectedNPC.name,
      response: '...',
      emotion: '',
      mood: '',
      html: `<p><strong>${sender}:</strong> ${this.userMessage}</p>`,
    };

    this.storyLog.push(tempInteraction);
    const message = this.userMessage;
    this.userMessage = '';

    this.api.interactNPC(sender, this.selectedNPC.name, message).subscribe({
      next: (interaction) => {
        Object.assign(tempInteraction, interaction);
        this.sendingMessage = false;
      },
      error: (err) => {
        console.error('Erro ao enviar mensagem', err);
        this.storyLog = this.storyLog.filter((i) => i !== tempInteraction);
        this.userMessage = message;
        this.sendingMessage = false;
      },
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
