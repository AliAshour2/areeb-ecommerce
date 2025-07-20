import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundedRating',
  standalone : true ,
})
export class RoundedRatingPipe implements PipeTransform {

  transform(value: number): number {
    return Math.round(value);
  }

}
