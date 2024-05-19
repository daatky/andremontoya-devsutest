import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { DropDownItem, DropDownModel } from '@domain/models/components/dropdown.interface';

@Component({
  selector: 'app-drop-donw',
  templateUrl: './drop-donw.component.html',
  styleUrl: './drop-donw.component.scss'
})
export class DropDonwComponent {

  @Input() model: DropDownModel;

  constructor(
    private eRef: ElementRef
  ) {
    this.model = { show: false, enable: false, showOptions: false };
  }

  clicItem(item: DropDownItem) {
    if (!item?.action) {
      return;
    }

    item.action(this.model.idOption);
    this.showOptions();
  }

  showOptions() {
    if (!this.model) {
      return;
    }

    this.model.showOptions = !this.model.showOptions;
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
