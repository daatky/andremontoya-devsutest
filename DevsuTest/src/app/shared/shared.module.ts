import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ButtomComponent } from './components/buttom/buttom.component';
import { SelectComponent } from './components/select/select.component';
import { InputComponent } from './components/input/input.component';
import { DropDonwComponent } from './components/drop-donw/drop-donw.component';
import { ModalComponent } from './components/modal/modal.component';
import { FilterPipe } from "./pipes/filterTextElements.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  declarations: [
    AppBarComponent,
    SearchBarComponent,
    ButtomComponent,
    SelectComponent,
    InputComponent,
    DropDonwComponent,
    ModalComponent,
    FilterPipe
  ],
  exports: [
    AppBarComponent,
    SearchBarComponent,
    ButtomComponent,
    SelectComponent,
    InputComponent,
    DropDonwComponent,
    ModalComponent,
    FilterPipe
  ]
})

export class SharedModule { }
