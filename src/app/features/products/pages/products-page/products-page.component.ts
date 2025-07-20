import { Component, signal } from '@angular/core';
import { Products } from '../../../../shared/models/prodcuts.model';
import { ProductsService } from '../../service/products.service';
import { CardSkeletonComponent } from "../../../../shared/components/skeletons/card-skeleton/card-skeleton.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-products-page',
  imports: [CardSkeletonComponent, ProductCardComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  standalone: true,
})
export class ProductsPageComponent {
  products = signal<Products[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading.set(true)
    this.error.set(null);

    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false)
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load products. Please try again later.');
        this.isLoading.set(false);
      }
    })
  }

  retryLoadProducts(): void {
    this.loadProducts();
  }

}
