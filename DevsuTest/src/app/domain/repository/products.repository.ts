import { Injectable } from "@angular/core";
import { ProductsService } from "@core/services/remotes/products.service";
import { ProductModel } from "../models/entities/product.interface";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductsRepository {

  constructor(
    private productsService: ProductsService
  ) {

  }

  getProductList() : Observable<ProductModel[]> {
    return this.productsService.getProductList();
  }

  createProduct(body: ProductModel) : Observable<ProductModel> {
    return this.productsService.createProduct(body);
  }

  validateIfProductIdExist(id: string) : Observable<boolean> {
    return this.productsService.validateIfProductIdExist(id);
  }

  deleteProduct(id: string) : Observable<string> {
    return this.productsService.deleteProduct(id);
  }

  updateProduct(body: ProductModel) : Observable<ProductModel> {
    return this.productsService.updateProduct(body);
  }

}
