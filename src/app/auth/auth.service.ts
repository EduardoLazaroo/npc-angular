import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  public user$ = new BehaviorSubject<User | null>(null);

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.user$.next(user);
    });
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.user$.next(result.user);
    } catch (err) {
      console.error('Erro no login com Google:', err);
    }
  }

  async loginWithEmail(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      this.user$.next(result.user);
    } catch (err) {
      console.error('Erro no login com e-mail:', err);
    }
  }

  async registerWithEmail(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      this.user$.next(result.user);
    } catch (err) {
      console.error('Erro ao criar conta:', err);
    }
  }

  // ✅ Logout
  async logout() {
    await signOut(this.auth);
    this.user$.next(null);
  }
}
