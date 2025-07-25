import { Component, computed, inject, signal } from '@angular/core';
import { Products } from '../../../../shared/models/prodcuts.model';
import { ProductsService } from '../../service/products.service';
import { CardSkeletonComponent } from '../../../../shared/components/skeletons/card-skeleton/card-skeleton.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CartService } from '../../../cart/service/cart.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { TokenService } from '../../../../core/services/token/token.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { Router } from '@angular/router';

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

  cartServices = inject(CartService);
  wishlistService = inject(WishlistService);
  private toast = inject(ToastService);
  private tokenService = inject(TokenService);

  wishlist = computed(() => this.wishlistService.wishlist());
  isInWishlist(productId: string): boolean {
    return this.wishlist().some(item => item.id === productId);
  }

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(
          err.message || 'Failed to load products. Please try again later.'
        );
        this.isLoading.set(false);
      },
    });
  }

  retryLoadProducts(): void {
    this.loadProducts();
  }

  handleAddToCart(productId: string) {
    if (!this.tokenService.isAuthenticated()) {
      this.toast.showError('Need To LogIn');
      return;
    }
    this.toast.showLoading('Adding Product To Cart');
    this.cartServices.addProductToCart(productId).subscribe({
      next: () => this.toast.showSuccess('Product added to cart'),
    });
  }

  handleToggleWishlist(productId: string) {
    if (!this.tokenService.isAuthenticated()) {
      this.toast.showError('Need To LogIn');
      return;
    }

    if (this.wishlistService.isInWishlist(productId)) {
      this.toast.showLoading('Removing item from wishlist');
      this.wishlistService.delteProductFromWishList(productId).subscribe({
        next: () => this.toast.showSuccess('Product removed from the wishlist'),
      });
    } else {
      this.toast.showLoading('Adding item to wishlist');
      this.wishlistService.addProductToWishList(productId).subscribe({
        next: () => this.toast.showSuccess('product added to wishlist'),
      });
    }
  }
}
