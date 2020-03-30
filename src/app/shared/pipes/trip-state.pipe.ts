import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripState'
})
export class TripStatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const hash = {
      Active: 'Активна',
      Canceled: 'Відмінена',
      Complete: 'Завершена',
    }
    return hash[value];
  }
}
