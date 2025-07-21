import { Component, signal } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartProduct } from '../../../../shared/models/cart.model';
import { CartCardComponent } from "../../components/cart-card/cart-card.component";
import { CardSkeletonComponent } from "../../../../shared/components/skeletons/card-skeleton/card-skeleton.component";

@Component({
  selector: 'app-cart-page',
  imports: [CartCardComponent, CardSkeletonComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  standalone:true,
})
export class CartPageComponent {

  cartItemsList = signal<CartProduct[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(private cartService : CartService){
    this.loadCart();
  }

  private loadCart():void {
    this.isLoading.set(true)
    this.error.set(null);

    this.cartService.getLoggedInUserCart().subscribe({
      next: (response)=>{
        this.cartItemsList.set(response.data.products);
        this.isLoading.set(false);
      },
      error : (err)=> {
        this.error.set(err.message  || 'Failed to laod the cart . Please try again later.');
        this.isLoading.set(false);
      }
    })
  }


}
