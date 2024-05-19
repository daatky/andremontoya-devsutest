import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
    save(key:string, value:any) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string) {
      return JSON.parse(sessionStorage.getItem(key)!);
    }

    remove(key:string) {
      sessionStorage.removeItem(key);
    }

    clearAllStorage () {
      sessionStorage.clear();
    };
}
