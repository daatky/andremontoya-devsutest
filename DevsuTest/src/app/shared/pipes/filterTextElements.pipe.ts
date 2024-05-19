import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '@domain/models/entities/product.interface';

@Pipe({
  name: 'filterProductElements'
})
@Injectable({
  providedIn: 'root'
})
export class FilterPipe implements PipeTransform {
  transform(items: ProductModel[], searchText: string): ProductModel[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText.length == 0) {
      return items;
    }

    searchText = searchText.toLowerCase();
    return items.filter(item =>
      item.name?.toLowerCase().includes(searchText) || item.description?.toLowerCase().includes(searchText)
    );
  }
}
