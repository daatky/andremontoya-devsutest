import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '@core/services/locals/storage.service';
import { DateUtilsService } from '@core/utils/date-utils.service';
import { ButtomTypes } from '@shared/enum/components/buttomstyle.enum';
import { EntityAction } from '@shared/enum/local-routes.enum';
import { StorageServiceKeysEnum } from '@shared/enum/storagekeys.enum';
import { ProductBusiness } from '@domain/busines-logic/products.business';
import { ButtomModel } from '@domain/models/components/buttom.interface';
import { InputModel } from '@domain/models/components/input.interface';
import { ProductModel } from '@domain/models/entities/product.interface';
import { Observable, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit, OnDestroy {

  public entityAction: string | undefined;
  public productModel : ProductModel;
  public form: FormGroup;
  public inputsMap: Map<string, InputModel>;
  public buttomRestart: ButtomModel;
  public buttomSend: ButtomModel;

  constructor(
    private productsBusiness: ProductBusiness,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private dateUtilsService: DateUtilsService,
    private storageService: StorageService
  ) {
    this.entityAction = EntityAction.CREATE;
    this.productModel = this.productsBusiness.createEmptyProductModel();
    this.form = this.productsBusiness.createFormControls(this.productModel, EntityAction.CREATE);
    this.inputsMap = this.productsBusiness.getInputsByAction(this.entityAction, this.form);
    this.buttomRestart = this.createButtomRestart();
    this.buttomSend = this.createButtomSend();
  }

  ngOnInit(): void {
    this.getUrlParams();
    this.createFormDataByEntityAction();
    this.form.statusChanges.subscribe(() => {
      this.buttomSend.enable = this.form.valid;
    });
    this.validateIfProductIdDontExist();
  }

  ngOnDestroy(): void {
    if (this.entityAction && this.entityAction === EntityAction.UPDATE) {
      this.storageService.removeItem(StorageServiceKeysEnum.PRODUCT_ITEM, false);
    }
  }

  getUrlParams() {
    const { entityAction } = this.activeRoute.snapshot.params

    if (
      entityAction &&
      entityAction !== ':entityAction'
    ) {
      this.entityAction = entityAction;
      return;
    }

    alert('No se ha podido determinar el tipo de accion a ejecutar (EntityAction).');
    this.location.back();
  }

  createFormDataByEntityAction() {
    if (this.entityAction == EntityAction.CREATE) {
      return;
    }

    if (this.entityAction == EntityAction.UPDATE) {
      this.productModel = this.storageService.getItem(StorageServiceKeysEnum.PRODUCT_ITEM, false);
      this.form = this.productsBusiness.createFormControls(this.productModel, EntityAction.UPDATE);
      this.inputsMap = this.productsBusiness.getInputsByAction(this.entityAction, this.form);
    }
  }

  getInputModelByKey(key: string) : InputModel {
    let input = this.inputsMap.get(key);

    if (!input) {
      return this.productsBusiness.createDefaultInputModel(true, 'text');
    }

    return input;
  }

  createButtomRestart() : ButtomModel {
    return {
      enable: true,
      show: true,
      type: ButtomTypes.DEFAULT,
      action: () => {
        this.productModel = this.entityAction === EntityAction.UPDATE.toString() ?
          this.storageService.getItem(StorageServiceKeysEnum.PRODUCT_ITEM, false) :
          this.productsBusiness.createEmptyProductModel();
        this.form = this.productsBusiness.createFormControls(this.productModel, this.entityAction);
        this.inputsMap = this.productsBusiness.getInputsByAction(this.entityAction, this.form);
      },
      text: 'Reiniciar'
    };
  }

  createButtomSend() : ButtomModel {
    return {
      enable: false,
      show: true,
      type: ButtomTypes.YELLOW,
      action: () => {
        if (this.entityAction == EntityAction.CREATE) {
          this.createProduct();
          return;
        }

        this.updateProduct();
      },
      text: 'Enviar'
    };
  }

  validateUserId(id: string) : Observable<boolean> {
    return this.productsBusiness.validateIfProductIdExist(id);
  }

  validateIfProductIdDontExist() {
    this.form.get('ID')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.validateUserId(value))
    ).subscribe({
      next: (res) => {
        if (!res) {
          this.form.get('ID')?.setErrors(null);
          return;
        }

        this.form.get('ID')?.setErrors({ invalidValue: 'El ID ya existe, ingresa otro valor.' });
      },
      error: (error) => {
        alert('No se pudo validar si el ID del producto ya existe, por favor reintenar.')
      }
    });
  }

  checkDatesValues() : boolean {
    if (!this.dateUtilsService.compareDateEqualBiggerThanActualDate(this.form.get('DATE_RELEASED')?.value)) {
      this.form.get('DATE_RELEASED')?.setErrors({ invalidValue: 'La fecha de liberación debe ser mayor o igual a la actual' });
      return false;
    }

    if (!this.dateUtilsService.compareDatesAddingOneYear(
      this.form.get('DATE_RELEASED')?.value,
      this.form.get('DATE_REVISION')?.value
    )) {
      this.form.get('DATE_REVISION')?.setErrors({ invalidValue: 'La fecha de revisión debe ser un año mayor a la de liberación' });
      return false;
    }

    return true;
  }

  createProduct() {
    try {
      this.productModel = this.productsBusiness.setFormFieldsToModel(this.productModel, this.form);

      if (!this.checkDatesValues()) {
        return;
      }
      this.buttomSend.enable = false;

      this.productsBusiness.createProduct(this.productModel).subscribe({
        next: (res) => {
          this.productModel = res;
          alert('Producto creado de forma correcta');
          this.location.back();
        },
        error: (error: any) => {
          alert('Ocurrio un error al crear el producto. Error: ' + (error.message ? error.message : error));
          this.buttomSend.enable = true;
        }
      });
    } catch (error: any) {
      alert('Ocurrio un error al crear el producto. Error: ' + (error.message ? error.message : error));
    }
  }

  updateProduct() {
    try {
      this.productModel = this.productsBusiness.setFormFieldsToModel(this.productModel, this.form);

      if (!this.checkDatesValues()) {
        return;
      }
      this.buttomSend.enable = false;

      this.productsBusiness.updateProduct(this.productModel).subscribe({
        next: (res) => {
          this.productModel = res;
          alert('Producto actualizado de forma correcta');
          this.location.back();
        },
        error: (error: any) => {
          alert('Ocurrio un error al actualizar el producto. Error: ' + (error.message ? error.message : error));
          this.buttomSend.enable = true;
        }
      });
    } catch (error: any) {
      alert('Ocurrio un error al actualizar el producto. Error: ' + (error.message ? error.message : error));
    }
  }
}
