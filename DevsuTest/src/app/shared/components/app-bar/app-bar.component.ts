import { Component, Input } from '@angular/core';
import { AppBarStyle } from '@shared/enum/components/appbarstyle.enum';
import { AppBarModel } from '@domain/models/components/appbar.interface';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss'
})
export class AppBarComponent {

  @Input() model: AppBarModel;

  constructor() {
    this.model = { show: false, style: AppBarStyle.DEFAULT };
  }

  getClasses() {
    return {
      'appbar': true,
      [this.model?.style ? this.model.style.toString() : 'none']: true,
    };
  }

}
