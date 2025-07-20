import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/card.model';

@Pipe({
  name: 'sortFilter',
  standalone : true
})
export class SortFilterPipe implements PipeTransform {

  transform(products: Product[], sort: string): Product[] {
    if (!products) return [];
    if (!sort || sort === 'default') return products;
    return [...products].sort((a, b) => {
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      if (sort === 'ratingAsc') return a.rating.rate - b.rating.rate;
      if (sort === 'ratingDesc') return b.rating.rate - a.rating.rate;
      return 0;
    });
  }
}