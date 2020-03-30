import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reservationState'
})
export class ReservationStatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const hash = {
      Pending: 'Очікує підтвердження',
      Accepted: 'Підтверджено',
      Rejected: 'Відмовлено',
      'Canceled By Passenger': 'Скасована',
      'Canceled By Driver': 'Скасована водієм',
      'Trip Canceled': 'Відмінена'
    }
    return hash[value];
  }

}
