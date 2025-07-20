import { ResolveFn } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { inject } from '@angular/core';
import { Products } from '../../../shared/models/prodcuts.model';

export const productDetailsResolver: ResolveFn<Products> = (route, state) => {
  const productsService = inject(ProductsService);
  const id = route.paramMap.get('id')!;
  return productsService.getSpecificProduct(id);
};
