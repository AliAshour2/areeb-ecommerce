import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartProduct } from '../../../../shared/models/cart.model';
import { CartCardComponent } from '../../components/cart-card/cart-card.component';
import { CardSkeletonComponent } from '../../../../shared/components/skeletons/card-skeleton/card-skeleton.component';
import { ToastService } from '../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-cart-page',
  imports: [CartCardComponent, CardSkeletonComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  standalone: true,
})
export class CartPageComponent {
  cartItemsList = signal<CartProduct[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  private toast = inject(ToastService);

  constructor(private cartService: CartService) {
    this.loadCart();
  }

  private loadCart(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.cartService.getLoggedInUserCart().subscribe({
      next: (response) => {
        this.cartItemsList.set(response.data.products);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(
          err.message || 'Failed to laod the cart . Please try again later.'
        );
        this.isLoading.set(false);
      },
    });
  }

  removeItem(productId: string) {
    this.toast.showLoading('Remove item from the cart');
    this.cartService.RemoveSpecificCartItem(productId).subscribe({
      next: () => {
        this.cartItemsList.set(
          this.cartItemsList().filter((item) => item.product?.id !== productId)
        );
        this.toast.showSuccess("Product Removed")
      },
      error: (error) => {
        this.toast.showError('Try removing item again');
      },
    });
  }

  updateQuantity(productId: string, newCount: number) {
    this.toast.showLoading('Updateing item quantity');
    this.cartService.updateCartProductQuantity(productId, newCount).subscribe({
      next: () => {
        this.cartItemsList.set(
          this.cartItemsList().map((item) =>
            item.product?.id === productId ? { ...item, count: newCount } : item
          )
        );
        this.toast.showSuccess("Product updated")
      },
      error: (err) => {
        this.toast.showError('Try updated item quantity again');
      },
    });
  }
}
