import { Component,  input, output } from '@angular/core';
import { CartProduct } from '../../../../shared/models/cart.model';
import { RoundedRatingPipe } from '../../../../shared/pipes/rounded-rating/rounded-rating.pipe';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart-card',
  imports: [RoundedRatingPipe, CommonModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css',
  standalone: true,
})
export class CartCardComponent {
  product = input<CartProduct>();

  onQuantityUpdated = output<{ productId: string, newCount: number }>();
  onRemoved =  output<{productId: string}>();

  updateQuantity(productId: string, newCount: number) {
    this.onQuantityUpdated.emit({productId, newCount});
  }

  removeItem(productId: string) {
    this.onRemoved.emit({productId});
  }

}
