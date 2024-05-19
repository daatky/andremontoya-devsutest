import { Injectable, Input } from "@angular/core";
import { InputModel } from "../models/components/input.interface";
import { IdGeneratorService } from "@core/services/generals/id-generator.service";
import { EntityAction } from "@shared/enum/local-routes.enum";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductModel } from "../models/entities/product.interface";
import { ProductsRepository } from "../repository/products.repository";
import { catchError, map, throwError } from "rxjs";
import { DateUtilsService } from "@core/utils/date-utils.service";

@Injectable({ providedIn: 'root' })
export class ProductBusiness {

  public inputsForm: any;

  constructor(
    private idGeneratorService: IdGeneratorService,
    private formBuilder: FormBuilder,
    private productsRepository: ProductsRepository,
    private dateutilsService: DateUtilsService
  ) {

  }

  createEmptyProductModel() : ProductModel {
    return {
      id: '',
      name: '',
      description: '',
      logo: ''
    };
  }

  createDefaultInputModel(
    readonly: boolean,
    type: string
  ) : InputModel {
    return {
      id: this.idGeneratorService.generateIdWithSeed(),
      show: true,
      readonly: readonly,
      showError: false,
      useCustomError: false,
      type: type
    };
  }

  createFormControls(
    product: ProductModel,
    entityAction: string | undefined
  ) : FormGroup {
    return this.formBuilder.group({
      ID : [
        product ? product.id : '',
        this.getValidatorsByEntityAction(entityAction, "alphanumeric", 3, 10)
      ],
      NAME :  [
        product ? product.name : '',
        this.getValidatorsByEntityAction(entityAction, "stringesp", 5, 100)
      ],
      DESCRIPTION: [
        product ? product.description : '',
        this.getValidatorsByEntityAction(entityAction, "stringesp", 10, 200)
      ],
      LOGO: [
        product ? product.logo : '',
        this.getValidatorsByEntityAction(entityAction, "url")
      ],
      DATE_RELEASED: [
        product ? this.dateutilsService.formatDateForInputTypeDate(product.date_release) : '',
        this.getValidatorsByEntityAction(entityAction, "")
      ],
      DATE_REVISION: [
        product ? this.dateutilsService.formatDateForInputTypeDate(product.date_revision) : '',
        this.getValidatorsByEntityAction(entityAction, "")
      ]
    });
  }

  getValidatorsByEntityAction(
    entityAction: string | undefined,
    type: string,
    min: number = -1,
    max: number = -1,
    enumType: any = undefined,
    notRequired: boolean = false
  ) {
    let validators = [];
    switch (type) {
      case "alphanumeric":
        validators.push(Validators.pattern('^[A-Za-z0-9-]+$'));
        break;
      case "number":
        validators.push(Validators.pattern('^[0-9]+$'));
        break;
      case "string":
        validators.push(Validators.pattern('^[A-Za-z]+$'));
        break;
      case "stringesp":
        validators.push(Validators.pattern('^[A-Za-zñÑ,.À-ÖØ-öø-ÿ ]+$'));
        break;
      case "decimal":
        validators.push(Validators.pattern('^([.0-9])+$'));
        break;
      case "url":
        validators.push(Validators.pattern(/^(https?):\/\/[^\s/$.?#].[^\s]*$/))
        break;
      default: break;
    }
    if (min !== -1) { validators.push(Validators.minLength(min)); }
    if (max !== -1) { validators.push(Validators.maxLength(max)); }
    if (entityAction === EntityAction.CREATE && !notRequired) { validators.push(Validators.required); }
    return validators;
  }

  getInputsByAction(
    entityAction: string | undefined,
    form: FormGroup
  ) : Map<string, InputModel> {
    let inputsMap = new Map<string, InputModel>();

    inputsMap.set('ID', {
      ...this.createDefaultInputModel(false, 'text'),
      label: 'Id',
      value: '',
      readonly: entityAction === EntityAction.UPDATE.toString(),
      data: form.controls['ID'],
      errorMessage: '',
      placeholder: '',
      maxLength: 10,
      minLength: 3
    });

    inputsMap.set('NAME', {
      ...this.createDefaultInputModel(false, 'text'),
      label: 'Nombre',
      value: '',
      data: form.controls['NAME'],
      errorMessage: '',
      placeholder: '',
      maxLength: 100,
      minLength: 5
    });

    inputsMap.set('DESCRIPTION', {
      ...this.createDefaultInputModel(false, 'text'),
      label: 'Descripción',
      data: form.controls['DESCRIPTION'],
      errorMessage: '',
      placeholder: '',
      maxLength: 200,
      minLength: 10
    });

    inputsMap.set('LOGO', {
      ...this.createDefaultInputModel(false, 'text'),
      label: 'Logo',
      data: form.controls['LOGO'],
      errorMessage: '',
      placeholder: ''
    });

    inputsMap.set('DATE_RELEASED', {
      ...this.createDefaultInputModel(false, 'date'),
      label: 'Fecha de Liberación',
      data: form.controls['DATE_RELEASED'],
      errorMessage: '',
      placeholder: ''
    });

    inputsMap.set('DATE_REVISION', {
      ...this.createDefaultInputModel(false, 'date'),
      label: 'Fecha de Revisión',
      data: form.controls['DATE_REVISION'],
      errorMessage: '',
      placeholder: ''
    });

    return inputsMap;
  }

  getProductList() {
    return this.productsRepository.getProductList()
      .pipe(
        map(data => {
          return data;
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  createProduct(
    body: ProductModel
  ) {
    return this.productsRepository.createProduct(body)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  validateIfProductIdExist(id: string) {
    return this.productsRepository.validateIfProductIdExist(id)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  setFormFieldsToModel( model: ProductModel, form: FormGroup ) {
    model.id = form.get('ID')?.value;
    model.name = form.get('NAME')?.value;
    model.description = form.get('DESCRIPTION')?.value;
    model.logo = form.get('LOGO')?.value;
    model.date_release = form.get('DATE_RELEASED')?.value;
    model.date_revision = form.get('DATE_REVISION')?.value;

    return model;
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  updateProduct(
    body: ProductModel
  ) {
    return this.productsRepository.updateProduct(body)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }
}
