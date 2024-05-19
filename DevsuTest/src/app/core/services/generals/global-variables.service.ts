import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GlobalVariablesService {
  public itemsIdSeeds: number // Semilla para genera el id de los items
  public headersNoCahe = new HttpHeaders()
                              .set('Cache-Control', 'no-cache')
                              .set('Access-Control-Allow-Origin', '*');
  public showModal : boolean = false;

  constructor(
    private router: Router,
  ) {
    this.itemsIdSeeds = 0
  }
}
