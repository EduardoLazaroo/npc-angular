import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NPC {
  id: number;
  name: string;
  origin_world: string;
  archetype: string;
  alignment: string;
  personality_traits: string;
  voice_style: string;
  mood: string;
  emotion: string;
  skills: string;
  known_for: string;
  catchphrase: string;
  backstory: string;
  tags: string[];
  avatar_url: string;
}

export interface Interaction {
  from: string;
  to: string;
  response: string;
  emotion: string;
  mood: string;
  html: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getNPCs(): Observable<NPC[]> {
    return this.http.get<NPC[]>(`${this.baseUrl}/npcs`);
  }

  getNPCByName(name: string): Observable<NPC> {
    return this.http.get<NPC>(`${this.baseUrl}/npc/${name}`);
  }

  registerNPC(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register_npc`, data);
  }

  interactNPC(
    from: string,
    to: string,
    message: string
  ): Observable<Interaction> {
    return this.http.post<Interaction>(`${this.baseUrl}/interact_npc`, {
      from,
      to,
      message,
    });
  }

  getStoryLog(npc_name: string): Observable<any[]> {
    const params = new HttpParams().set('npc_name', npc_name);
    return this.http.get<any[]>(`${this.baseUrl}/story_log`, { params });
  }

  searchNPC(query: string): Observable<NPC> {
    return this.http.post<NPC>(`${this.baseUrl}/search_npc`, { query });
  }
}
