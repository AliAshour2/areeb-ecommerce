import { Component, inject, input } from '@angular/core';
import { CartProduct } from '../../../../shared/models/cart.model';
import { RoundedRatingPipe } from '../../../../shared/pipes/rounded-rating/rounded-rating.pipe';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { ToastService } from '../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-cart-card',
  imports: [RoundedRatingPipe, CommonModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css',
  standalone: true,
})
export class CartCardComponent {
  product = input<CartProduct>();

  private cartService = inject(CartService);
  private toast = inject(ToastService);

  removeItem(productId: string) {
    this.toast.showLoading("Remove item from the cart")
    this.cartService.RemoveSpecificCartItem(productId).subscribe({
      next: (response) => { 
        this.toast.showSuccess("Item removed from cart")
       },
      error: (error)=>{
        this.toast.showError("Try removing item again")
      }
    });
  }

  updateQuantity(productId: string, newCount: number) {
    this.toast.showLoading("Updateing item quantity")
    this.cartService.updateCartProductQuantity(productId, newCount).subscribe({
      next: (response) => {
        this.toast.showSuccess("Item quantity updated");
      },
      error: (err) => {
        this.toast.showError("Try updated item quantity again");
      }
    });
  }


}
