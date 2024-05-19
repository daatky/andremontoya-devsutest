import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormComponent } from '@presentation/products/form/form.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductBusiness } from '@domain/busines-logic/products.business';
import { DateUtilsService } from '@core/utils/date-utils.service';
import { StorageService } from '@core/services/locals/storage.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EntityAction } from '@shared/enum/local-routes.enum';
import { StorageServiceKeysEnum } from '@shared/enum/storagekeys.enum';
import { InputModel } from '@domain/models/components/input.interface';
import { ButtomTypes } from '@shared/enum/components/buttomstyle.enum';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let productsBusinessMock: any;
  let dateUtilsServiceMock: any;
  let storageServiceMock: any;
  let locationMock: any;
  let activatedRouteMock: any;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    productsBusinessMock = {
      createEmptyProductModel: jest.fn().mockReturnValue({}),
      createFormControls: jest.fn(),
      getInputsByAction: jest.fn().mockReturnValue(new Map()),
      validateIfProductIdExist: jest.fn().mockReturnValue(of(false)),
      setFormFieldsToModel: jest.fn().mockReturnValue({}),
      createProduct: jest.fn().mockReturnValue(of({})),
      updateProduct: jest.fn().mockReturnValue(of({})),
      createDefaultInputModel: jest.fn().mockReturnValue({
        id: '1',
        show: true,
        type: 'text',
        showError: false,
        useCustomError: false,
        readonly: true
      })
    };

    dateUtilsServiceMock = {
      compareDateEqualBiggerThanActualDate: jest.fn().mockReturnValue(true),
      compareDatesAddingOneYear: jest.fn().mockReturnValue(true)
    };

    storageServiceMock = {
      getItem: jest.fn().mockReturnValue({}),
      removeItem: jest.fn()
    };

    locationMock = {
      back: jest.fn()
    };

    activatedRouteMock = {
      snapshot: {
        params: {
          entityAction: 'create'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [FormComponent],
      providers: [
        FormBuilder,
        { provide: ProductBusiness, useValue: productsBusinessMock },
        { provide: DateUtilsService, useValue: dateUtilsServiceMock },
        { provide: StorageService, useValue: storageServiceMock },
        { provide: Location, useValue: locationMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);

    // Set up the mock for createFormControls after formBuilder is initialized
    productsBusinessMock.createFormControls.mockReturnValue(
      formBuilder.group({
        ID: [''],
        NAME: [''],
        DESCRIPTION: [''],
        LOGO: [''],
        DATE_RELEASED: [''],
        DATE_REVISION: ['']
      })
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.form = productsBusinessMock.createFormControls();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.entityAction).toBe(EntityAction.CREATE);
    expect(productsBusinessMock.createEmptyProductModel).toHaveBeenCalled();
    expect(productsBusinessMock.createFormControls).toHaveBeenCalledWith(component.productModel, EntityAction.CREATE);
    expect(productsBusinessMock.getInputsByAction).toHaveBeenCalledWith(EntityAction.CREATE, component.form);
  });

  it('should call getUrlParams and set entityAction', () => {
    component.getUrlParams();
    expect(component.entityAction).toBe(EntityAction.CREATE);
  });

  it('should call getUrlParams and alert if entityAction is invalid', () => {
    activatedRouteMock.snapshot.params.entityAction = ':entityAction';
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.getUrlParams();
    expect(window.alert).toHaveBeenCalledWith('No se ha podido determinar el tipo de accion a ejecutar (EntityAction).');
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('should call validateIfProductIdExist directly', () => {
    component.validateUserId('testId');
    expect(productsBusinessMock.validateIfProductIdExist).toHaveBeenCalledWith('testId');
  });

  it('should create form data for update action', () => {
    component.entityAction = EntityAction.UPDATE;
    component.createFormDataByEntityAction();
    expect(storageServiceMock.getItem).toHaveBeenCalledWith(StorageServiceKeysEnum.PRODUCT_ITEM, false);
    expect(productsBusinessMock.createFormControls).toHaveBeenCalledWith(component.productModel, EntityAction.UPDATE);
    expect(productsBusinessMock.getInputsByAction).toHaveBeenCalledWith(EntityAction.UPDATE, component.form);
  });

  it('should get input model by key', () => {
    const key = 'testKey';
    const inputModel: InputModel = {
      id: '1',
      show: true,
      type: 'text',
      showError: false,
      useCustomError: false,
      readonly: true
    };
    productsBusinessMock.getInputsByAction.mockReturnValue(new Map([[key, inputModel]]));
    component.inputsMap = productsBusinessMock.getInputsByAction(EntityAction.CREATE, component.form);
    expect(component.getInputModelByKey(key)).toBe(inputModel);
  });

  it('should return default input model if key not found', () => {
    const key = 'invalidKey';
    const defaultInputModel: InputModel = {
      id: '1',
      show: true,
      type: 'text',
      showError: false,
      useCustomError: false,
      readonly: true
    };
    productsBusinessMock.createDefaultInputModel = jest.fn().mockReturnValue(defaultInputModel);
    expect(component.getInputModelByKey(key)).toBe(defaultInputModel);
  });

  it('should create buttom restart', () => {
    const button = component.createButtomRestart();
    expect(button.text).toBe('Reiniciar');
    expect(button.type).toBe(ButtomTypes.DEFAULT);
  });

  it('should create buttom send', () => {
    const button = component.createButtomSend();
    expect(button.text).toBe('Enviar');
    expect(button.type).toBe(ButtomTypes.YELLOW);
  });

});
