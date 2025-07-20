import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/card.model';

@Pipe({
  name: 'ratingFilter' ,
  standalone : true 
})
export class RatingFilterPipe implements PipeTransform {

  transform(products: Product[], minRating: string): Product[] {
    if (!products) return [];
    if (!minRating || minRating === 'all') return products;
    return products.filter(product => product.rating.rate >= Number(minRating));
  }
}