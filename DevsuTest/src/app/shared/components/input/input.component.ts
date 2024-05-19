import { Component, Input } from '@angular/core';
import { InputModel } from '@domain/models/components/input.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input() model: InputModel;

  constructor() {
    this.model = { id: '-1', show: false, type: 'string', showError: false, useCustomError: false, readonly: true };
  }

  defineMaxLenght(): string {
    if (this.model.maxLength) {
      return this.model.maxLength.toString();
    }

    return '800';
  }

  defineMinLenght(): string {
    if (this.model.minLength) {
      return this.model.minLength.toString();
    }

    return '0';
  }

  getErrorMessage(controlName: any): string {
    try {
      let error = '';

      if (controlName.untouched && this.model.showError) {
        error = 'Valor invalido';
      }

      if (controlName.touched && controlName.errors != null) {
        error = this.defineErrorByType(controlName);
      }

      return error;
    } catch (error) {
      return '';
    }
  }

  defineErrorByType(controlName: any): string {
    if (controlName.errors.required) {
      return 'Error, el campo es requerido';
    }

    if (controlName.errors.email) {
      return 'Error, el campo es tipo email';
    }

    if (controlName.errors.invalidValue) {
      return controlName.errors.invalidValue;
    }

    return this.defineErrorByLength(controlName);
  }

  defineErrorByLength(controlName: any): string {
    if (controlName.errors.minlength) {
      return 'El tamano mínimo es ' + controlName.errors.minlength.requiredLength;
    }

    if (controlName.errors.maxlength) {
      return 'El tamano maximo es ' + controlName.errors.maxlength.requiredLength;
    }

    return '';
  }

}
