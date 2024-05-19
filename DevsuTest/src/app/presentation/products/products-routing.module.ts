import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ProductsRoutes } from '../../shared/enum/local-routes.enum';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ProductsRoutes.VIEW,
        component: ViewComponent
      },
      {
        path: ProductsRoutes.FORM,
        component: FormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
