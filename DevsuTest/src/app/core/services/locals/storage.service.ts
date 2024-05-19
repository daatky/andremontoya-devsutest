import { Injectable } from "@angular/core";
import { LocalStorageService } from "@core/utils/local-storage.service";
import { SessionStorageService } from "@core/utils/session-storage.service";
import { StorageServiceKeysEnum } from "@shared/enum/storagekeys.enum";

@Injectable({ providedIn: 'root' })
export class StorageService {

  constructor(
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) { }

  public saveItem(
    object : any,
    key: StorageServiceKeysEnum,
    isLocal: boolean = true
  ) {
    if (isLocal) {
      this.localStorageService.save(key, object);
    } else {
      this.sessionStorageService.save(key, object);
    }
  }

  public getItem(
    key: StorageServiceKeysEnum,
    isLocal: boolean = true
  ) : any {
    if (isLocal) {
      return this.localStorageService.get(key);
    } else {
      return this.sessionStorageService.get(key);
    }
  }

  public removeItem(
    key : StorageServiceKeysEnum,
    isLocal : boolean
  ) {
    if (isLocal) {
      this.localStorageService.remove(key);
    } else {
      this.sessionStorageService.remove(key);
    }
  }

  public clear(
    isLocal : boolean
  ) {
    if (isLocal) {
      this.localStorageService.clearAllStorage();
    } else {
      this.sessionStorageService.clearAllStorage();
    }
  }
}
