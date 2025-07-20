import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/card.model';

@Pipe({
  name: 'priceFilter',
  standalone : true
})
export class PriceFilterPipe implements PipeTransform {
  transform(products: Product[], priceRange: string): Product[] {
    if (!products) return [];
    if (!priceRange || priceRange === 'all') return products;
    const [min, max] = priceRange.split('-').map(Number);
    return products.filter(product =>
      product.price >= (min || 0) && product.price <= (max || Infinity)
    );
  }
}
