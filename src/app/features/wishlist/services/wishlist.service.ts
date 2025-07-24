import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TokenService } from '../../../core/services/token/token.service';
import { WishListEndPoint } from '../../../shared/constants/app.constants';
import {
  GetWishListResponse,
  WishlistResponse,
  WishListProducts,
} from '../../../shared/models/wishlist.model';
import { Products } from '../../../shared/models/prodcuts.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}
  private tokenService = inject(TokenService);
  protected headers = this.tokenService.getAuthHeaders();

  wishlist = signal<WishListProducts[]>([]);

  /**
   * Loads the wishlist from the backend and updates the signal.
   */
  loadWishlist() {
    this.getWishList().subscribe({
      next: (res) => this.wishlist.set(res.data),
      error: () => this.wishlist.set([])
    });
  }

  /**
   * Checks if a product is in the wishlist by id.
   */
  isInWishlist(productId: string): boolean {
    return this.wishlist().some(item => item.id === productId);
  }

  /**
   * Toggles the wishlist status for a product and updates the signal.
   */
  toggleWishlist(product: Products) {
    if (this.isInWishlist(product.id)) {
      this.delteProductFromWishList(product.id).subscribe({
        next: () => this.loadWishlist(),
        error: () => {}
      });
    } else {
      this.addProductToWishList(product.id).subscribe({
        next: () => this.loadWishlist(),
        error: () => {}
      });
    }
  }

  addProductToWishList(productId: string): Observable<WishlistResponse> {
    return this.http.post<WishlistResponse>(
      WishListEndPoint,
      { productId },
      { headers: this.headers }
    );
  }

  delteProductFromWishList(productId: string): Observable<WishlistResponse> {
    return this.http.delete<WishlistResponse>(
      `${WishListEndPoint}/${productId}`,
      {
        headers: this.headers,
      }
    );
  }

  getWishList(): Observable<GetWishListResponse> {
    return this.http.get<GetWishListResponse>(`${WishListEndPoint}`, {
      headers: this.headers,
    });
  }
}
