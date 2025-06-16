import { Injectable } from '@angular/core';
import { LocalStorageStateEnum } from '@e/local-storage-key.enum';

@Injectable({ providedIn: 'root' })
export class LocalSessionService {
  private _key = LocalStorageStateEnum.clientId;

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

  public saveSession(clientId: string | null): void {
    if (typeof window !== 'undefined' && window.localStorage && clientId) {
      localStorage.setItem(this._key, clientId);
    }
  }

  public clearSession(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this._key)
    }
  }
}
