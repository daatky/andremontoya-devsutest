import { Component, OnInit } from '@angular/core';
import { AppBarModel } from './domain/models/components/appbar.interface';
import { AppBarStyle } from '@shared/enum/components/appbarstyle.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'DevsuTest';
  appBarModel: AppBarModel;

  constructor() {
    this.appBarModel = { show: false, style: AppBarStyle.DEFAULT };
  }

  ngOnInit(): void {
    this.appBarModel = { show: true, text: 'BANCO', iconName: 'payments', style: AppBarStyle.DEFAULT };
  }

}
