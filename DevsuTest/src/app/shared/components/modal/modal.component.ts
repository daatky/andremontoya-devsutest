import { Component, Input, OnInit, input } from '@angular/core';
import { ButtomSizes, ButtomTypes } from '@shared/enum/components/buttomstyle.enum';
import { ButtomModel } from '@domain/models/components/buttom.interface';
import { ModalModel } from '@domain/models/components/modal.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  @Input() model: ModalModel;

  public buttomCancel: ButtomModel;
  public buttomConfirm: ButtomModel;

  constructor() {
    this.model = {
      show: false,
      enableButtom: false,
      label: 'Estas seguro que deseas eliminar el :param'
    };
    this.buttomCancel = this.createButtomCancel();
    this.buttomConfirm = this.createButtomConfirm();
  }

  ngOnInit(): void {
    this.buttomCancel = this.createButtomCancel();
    this.buttomConfirm = this.createButtomConfirm();
  }

  getLabel() {
    return this.model.label.replace(':param', !this.model.name ? '' : this.model.name);
  }

  createButtomCancel() : ButtomModel {
    return {
      show: true,
      enable: this.model.enableButtom,
      type: ButtomTypes.DEFAULT,
      syze: ButtomSizes.LARGE,
      text: 'Cancelar',
      action: () => {
        if (!this.model?.actionCancel) {
          return;
        }

        this.model.actionCancel();
      }
    };
  }

  createButtomConfirm() : ButtomModel {
    return {
      show: true,
      enable: this.model.enableButtom,
      type: ButtomTypes.YELLOW,
      syze: ButtomSizes.LARGE,
      text: 'Confirmar',
      action: () => {
        if (!this.model?.actionConfirm) {
          return;
        }

        this.model.actionConfirm(this.model.id);
      }
    };
  }

}
