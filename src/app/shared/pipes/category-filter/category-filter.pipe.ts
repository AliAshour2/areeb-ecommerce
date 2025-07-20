import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/card.model';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(products: Product[], category: string): Product[] {
    if (!products) return [];
    if (!category || category === 'all') return products;
    return products.filter(product => product.category === category)

  }

}
