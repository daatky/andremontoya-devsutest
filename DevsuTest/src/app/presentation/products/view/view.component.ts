import { Component, OnInit, input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@core/services/locals/storage.service';
import { DateUtilsService } from '@core/utils/date-utils.service';
import { environment } from '@environment/environment';
import { ButtomTypes } from '@shared/enum/components/buttomstyle.enum';
import { SelectSizeEnum } from '@shared/enum/components/selectstyle.enum';
import { EntityAction, LocalRoutes, ProductsRoutes } from '@shared/enum/local-routes.enum';
import { StorageServiceKeysEnum } from '@shared/enum/storagekeys.enum';
import { ProductBusiness } from '@domain/busines-logic/products.business';
import { ButtomModel } from '@domain/models/components/buttom.interface';
import { SearchBarModel } from '@domain/models/components/searchbar.interface';
import { SelectModel, SelectValue } from '@domain/models/components/select.model';
import { ProductModel } from '@domain/models/entities/product.interface';
import { Location } from '@angular/common';
import { DropDownItem, DropDownModel } from '@domain/models/components/dropdown.interface';
import { ModalModel } from '@domain/models/components/modal.interface';
import { FilterPipe } from '@shared/pipes/filterTextElements.pipe';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {

  public productList: ProductModel[];
  public dropDownOptions: DropDownModel[];
  public serachBarModel: SearchBarModel;
  public addButtomModel: ButtomModel;
  public listSize: SelectModel;
  public modalModel: ModalModel;

  public currentPage: number;


  constructor(
    private dateUtilsService: DateUtilsService,
    private productsBusiness: ProductBusiness,
    private storageService: StorageService,
    private filterProductsElementsPipe: FilterPipe,
    private location: Location,
    private router: Router
  ) {
    this.currentPage = 1;
    this.productList = [];
    this.dropDownOptions = [];
    this.serachBarModel = { show: true, searchValue: '', placedolder: 'Search..' };
    this.addButtomModel = this.createAddButtomModel();
    this.listSize = this.createListSizeModel();
    this.modalModel = this.createModalModel();
  }

  ngOnInit(): void {
    this.getProductList();
  }

  createModalModel() : ModalModel {
    return {
      id: '',
      label: 'Estas seguro que deseas eliminar el producto: :param',
      enableButtom: true,
      show: false,
      name: '',
      actionCancel: () => this.closeModal(),
      actionConfirm: (idProduct: string) => this.deleteProduct(idProduct)
    };
  }

  closeModal() {
    this.modalModel.id = '';
    this.modalModel.name = '';
    this.modalModel.show = false;
  }

  formatDate(inputDate: Date | undefined) : string {
    try {
      if (!inputDate) {
        return '';
      }

      return this.dateUtilsService.formatDate(inputDate, environment.dateFormatOut);
    } catch (error) {
      return '';
    }
  }

  createAddButtomModel() : ButtomModel {
    return {
      show: true,
      enable: true,
      type: ButtomTypes.YELLOW,
      text: 'Agregar',
      action: () => {
        this.storageService.removeItem(StorageServiceKeysEnum.PRODUCT_ITEM, false);
        let route = LocalRoutes.PRODUCTS + '/' + ProductsRoutes.FORM;
        route = route.replace(':entityAction', EntityAction.CREATE);
        this.router.navigateByUrl(route);
      }
    };
  }

  createListSizeModel() : SelectModel {
    return {
      show: true,
      enable: true,
      placeholder: { label: '0', value: '0' },
      showOptions: false,
      values: [
        { label: '5', value: '5' },
        { label: '10', value: '10' },
        { label: '20', value: '20' },
      ],
      size: SelectSizeEnum.SMALL,
      selectedValue: { label: '5', value: '5' },
      actionOnChange: (item: SelectValue) => {
        this.currentPage = 1;
      }
    };
  }

  getFilteredProductList(): ProductModel[] {
    return this.filterProductsElementsPipe.transform(this.productList, this.serachBarModel.searchValue);
  }

  getPaginatedProductList(): ProductModel[] {
    let filteredList = this.getFilteredProductList();
    let pageSize = this.parseStringToIntSize(this.listSize.selectedValue?.value);
    let startIndex = (this.currentPage - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    return filteredList.slice(startIndex, endIndex);
  }

  calculateIfMoreThatOnePageExist() {
    let filteredList = this.getFilteredProductList();
    let pageSize = this.parseStringToIntSize(this.listSize.selectedValue?.value);
    let totalPage = Math.ceil(filteredList.length / pageSize);
    return totalPage > 1 && this.currentPage < totalPage;
  }

  nextPage(): void {
    this.currentPage++;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  parseStringToIntSize(size: string | undefined) {
    if (!size) {
      return this.productList.length;
    }

    return Number(size);
  }

  getProductById(id: string) : ProductModel {
    for(let item of this.productList) {
      if (id === item.id) {
        return item;
      }
    }

    return {};
  }

  getDropDownModel(product: ProductModel) : DropDownModel {
    return {
      idOption: product.id,
      show: true,
      enable: true,
      showOptions: false,
      items: [
        {
          text: 'Editar',
          action: (id: string) => {
            let index = this.productList.findIndex(item => item.id === id);

            if (index === -1) {
              alert('Lo sentimos, no se pudo determinar la informacion del producto.');
              return;
            }

            this.storageService.removeItem(StorageServiceKeysEnum.PRODUCT_ITEM, false);
            this.storageService.saveItem(this.productList[index], StorageServiceKeysEnum.PRODUCT_ITEM, false)
            let route = LocalRoutes.PRODUCTS + '/' + ProductsRoutes.FORM;
            route = route.replace(':entityAction', EntityAction.UPDATE);
            this.router.navigateByUrl(route);
          }
        },
        {
          text: 'Eliminar',
          action: (id: string) => {
            let product = this.getProductById(id);
            this.modalModel.id = product.id;
            this.modalModel.name = product.name;
            this.modalModel.show = true;
          }
        }

      ]
    };
  }

  createDropDownOptions(products: ProductModel[]) {
    this.dropDownOptions = [];

    for (let product of products) {
      this.dropDownOptions.push(this.getDropDownModel(product));
    }
  }

  getDropDownById(id: string | undefined) : DropDownModel {
    for (let model of this.dropDownOptions) {
      if (model.idOption === id) {
        return model;
      }
    }

    return { show: false, enable: false, showOptions: false };
  }

  getProductList()  {
    this.productsBusiness.getProductList().subscribe({
      next: (res) => {
        this.createDropDownOptions(res);
        this.productList = res;
      },
      error: (error) => {
        alert('Error al obtener la iformacion de los productos. Error: ' + (error.message ? error.message : error));
      }
    });
  }

  deleteProduct(id: string)  {
    this.modalModel.enableButtom = false;
    this.productsBusiness.deleteProduct(id).subscribe({
      next: (res) => {
        let index = this.productList.findIndex(item => item.id === id);
        this.productList.splice(index, 1);
        alert('Producto eliminado corectamente.');
        this.closeModal();
      },
      error: (error) => {
        alert('Error al eliminar el producto. Error: ' + (error.message ? error.message : error));
        this.closeModal();
      }
    });
  }

}
