import { Injectable } from '@angular/core'
import { GlobalVariablesService } from './global-variables.service'

class RNG {
    m: number;
    a: number;
    c: number;
    state: any;
    nextInt: () => any;
    nextFloat: () => any;
    nextRange: (start: any, end: any) => any;
    choice: (array: any) => any;

    constructor(seed:any) {
      this.m = 0x80000000;
      this.a = 1103515245;
      this.c = 12345;
      this.state = seed || Math.floor(Math.random() * (this.m - 1));

      this.nextInt = function() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
      }
      this.nextFloat = function() {
        return this.nextInt() / (this.m - 1);
      }
      this.nextRange = function(start, end) {
        let rangeSize = end - start;
        let randomUnder1 = this.nextInt() / this.m;
        return start + Math.floor(randomUnder1 * rangeSize);
      }
      this.choice = function(array) {
        let arrayValue = this.nextRange(0, array.length);
        return array[arrayValue];
      }
    }
}

@Injectable({ providedIn: 'root' })
export class IdGeneratorService {

    constructor(
      private globalVariablesService : GlobalVariablesService
    ) {

    }

    generateIdWithSeed() {
      const codigo = this.getCode(this.globalVariablesService.itemsIdSeeds)
      this.globalVariablesService.itemsIdSeeds += 1
      return codigo
    }

    getCode(seed : number){
      let rng = new RNG(seed);
      let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789".split('');
      let code = "";

      for (let i = 0; i < 30; i++) {
        code += rng.choice(caracteres);
      }
      return code;
    }
}
