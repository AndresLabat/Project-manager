import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'user';

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'Test1234!') {
      localStorage.setItem(this.storageKey, JSON.stringify({ username }));
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  getUser(): { username: string } | null {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : null;
  }
}

