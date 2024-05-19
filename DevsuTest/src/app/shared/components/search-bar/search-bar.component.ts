import { Component, Input } from '@angular/core';
import { SearchBarModel } from '@domain/models/components/searchbar.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Input() model: SearchBarModel;

  constructor() {
    this.model = { show: false, searchValue: '', placedolder: '' };
  }

}
