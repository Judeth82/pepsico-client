import { Injectable } from '@angular/core';
import { LocalStorageStateEnum } from '@e/local-storage-key.enum';

@Injectable({ providedIn: 'root' })
export class LocalSessionService {
  private _key = LocalStorageStateEnum.userSession;

  public isLogged(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem(this._key);
    }
    return false;
  }

  public getSession(): string | null {
    if (!this.isLogged()) {
      return null;
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this._key);
    }

    return null;
  }

  public saveSession(id: string | null): void {
    if (typeof window !== 'undefined' && window.localStorage && id) {
      localStorage.setItem(this._key, id);
    }
  }

  public clearSession(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this._key);
    }
  }
}
