import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { SelectSizeEnum } from '@shared/enum/components/selectstyle.enum';
import { SelectModel, SelectValue } from '@domain/models/components/select.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  @Input() model: SelectModel;

  constructor(
    private eRef: ElementRef
  ) {
    this.model = { show: false, enable: false, showOptions: false, placeholder: { label: '0' }, size: SelectSizeEnum.SMALL }
  }

  getClasses() {
    return {
      'select': true,
      'not-enable': !this.model.enable,
      [this.model?.size ? this.model.size.toString() : SelectSizeEnum.SMALL.toString() ]: true,
    };
  }

  getOptionsClasses() {
    return {
      'options': true,
      'active': this.model.showOptions,
      [this.model?.size ? this.model.size.toString() : SelectSizeEnum.SMALL.toString() ]: true,
    };
  }

  showOptions() {
    if (!this.model) {
      return;
    }

    this.model.showOptions = !this.model.showOptions;
  }

  changeValue(item: SelectValue) {
    this.model.selectedValue = item;

    if (this.model.actionOnChange) {
      this.model.actionOnChange(item);
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (this.model?.showOptions) {
        this.model.showOptions = false;
      }
    }
  }

}
