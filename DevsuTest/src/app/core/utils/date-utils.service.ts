import { Injectable, input } from "@angular/core";
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class DateUtilsService {

  formatDate(
    inputDate: Date,
    formatOut: string
  ): string {
    let dateObject;

    if (typeof inputDate === 'string') {
      let aux : string = inputDate;
      aux = aux.split('T')[0];

      dateObject = new Date(`${aux}T00:00:00`);
    } else {
      dateObject = inputDate;
    }

    let parsedDate = moment(dateObject);
    let formattedDate = parsedDate.format(formatOut);

    return formattedDate;
  }

  formatDateForInputTypeDate(
    date: Date | undefined
  ): string {
    if (!date) {
      return '';
    }

    if (typeof date === 'string') {
      date = new Date(date);
    }

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  compareDateEqualBiggerThanActualDate(date: string | undefined) : boolean {
    try {
      if (!date) {
        return false;
      }

      let inputDate = new Date(`${date}T00:00:00`);
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      return inputDate >= currentDate;
    } catch (error) {
      alert('Error al comparar la fecha actual con la ingresada. Error: ' + error);
      return false;
    }
  }

  compareDatesAddingOneYear(
    date: string,
    dateEnd: string
  ) {
    try {
      if (!date) {
        return false;
      }

      let inputDate = new Date(`${date}T00:00:00`);
      inputDate.setFullYear(inputDate.getFullYear() + 1)
      let endDate = new Date(`${dateEnd}T00:00:00`);

      return endDate.getTime() == inputDate.getTime();
    } catch (error) {
      alert('Error al comparar la fecha de liberacion con la de revision. Error: ' + error);
      return false;
    }
  }

}
