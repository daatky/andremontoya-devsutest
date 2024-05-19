import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { RemoteRoutes } from "@shared/enum/remote-routes.enum";
import { ProductModel } from "app/domain/models/entities/product.interface";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor(
    private http: HttpClient
  ) {

  }

  getProductList() : Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      environment.apiUrl + RemoteRoutes.BASE_URI_PRODUCTS
    );
  }

  createProduct(body: ProductModel) : Observable<ProductModel> {
    return this.http.post<ProductModel>(
      environment.apiUrl + RemoteRoutes.BASE_URI_PRODUCTS,
      body
    );
  }

  validateIfProductIdExist(id: string) : Observable<boolean> {
    return this.http.get<boolean>(
      environment.apiUrl + RemoteRoutes.BASE_URI_PRODUCTS + RemoteRoutes.CHECK_PRODUCID.replace(':id', id)
    );
  }

  deleteProduct(id: string) : Observable<string> {
    return this.http.delete(
      environment.apiUrl + RemoteRoutes.DELETE_URI_PRODUCTS.replace(':id', id), { responseType: 'text' }
    );
  }

  updateProduct(body: ProductModel) : Observable<ProductModel> {
    return this.http.put<ProductModel>(
      environment.apiUrl + RemoteRoutes.BASE_URI_PRODUCTS,
      body
    );
  }


}
