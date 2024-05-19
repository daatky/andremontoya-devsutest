import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ViewComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    HttpClientModule
  ]
})
export class ProductsModule { }
