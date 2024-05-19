import { Component, Input } from '@angular/core';
import { ButtomSizes, ButtomTypes } from '@shared/enum/components/buttomstyle.enum';
import { ButtomModel } from '@domain/models/components/buttom.interface';

@Component({
  selector: 'app-buttom',
  templateUrl: './buttom.component.html',
  styleUrl: './buttom.component.scss'
})
export class ButtomComponent {

  @Input() model: ButtomModel;

  constructor() {
    this.model = { show: false, enable: false, type: ButtomTypes.DEFAULT };
  }

  getClasses() {
    return {
      'buttom': true,
      'not-enable': !this.model.enable,
      [this.model?.type ? this.model.type.toString() : ButtomTypes.DEFAULT.toString() ]: true,
      [this.model?.syze ? this.model.syze.toString() : ButtomSizes.DEFAULT.toString() ]: true,
    };
  }

  execute() {
    if (!this.model?.action) {
      return;
    }

    this.model.action();
  }

}
