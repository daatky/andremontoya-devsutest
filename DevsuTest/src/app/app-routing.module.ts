import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalRoutes, ProductsRoutes } from './shared/enum/local-routes.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: LocalRoutes.PRODUCTS + '/' + ProductsRoutes.VIEW,
    pathMatch: 'full'
  },
  {
    path: LocalRoutes.PRODUCTS,
    loadChildren: () => import('@presentation/products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
