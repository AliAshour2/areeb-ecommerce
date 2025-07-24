import { Component, inject, signal } from '@angular/core';
import { WishListProducts } from '../../../../shared/models/wishlist.model';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ToastService } from '../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  private wishlistService = inject(WishlistService);
  private toast = inject(ToastService);

  wishlist = signal<WishListProducts[]>([]);
  isLoading = signal(true);
 error = signal(false);

  constructor() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.isLoading.set(true);
    this.wishlistService.getWishList().subscribe({
      next: (res) => {
        this.wishlist.set(res.data);
        this.isLoading.set(false);
      }
    });
  }


  removeItemFromWishList(productId: string){
    this.toast.showLoading('Removing item from wishlist');
    this.wishlistService.delteProductFromWishList(productId).subscribe({
      next: ()=> {
        this.wishlist.set(this.wishlist().filter(item => item.id !== productId));
        this.toast.showSuccess('Item removed from wishlist');
      }
    })


}
}