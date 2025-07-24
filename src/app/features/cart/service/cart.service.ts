import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '../../../core/services/token/token.service';
import { CartEndPoint } from '../../../shared/constants/app.constants';
import { Observable } from 'rxjs';
import { CartResponse } from '../../../shared/models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  private tokenService = inject(TokenService);
  protected headers = this.tokenService.getAuthHeaders();

  addProductToCart(productId: string) {
    const body = { productId };
    return this.http.post(CartEndPoint, body, { headers: this.headers });
  }

  updateCartProductQuantity(productId: string, count: number): Observable<any> {
    const body = { count };
    return this.http.put(`${CartEndPoint}/${productId}`, body, {
      headers: this.headers,
    });
  }

  RemoveSpecificCartItem(ProductId: string): Observable<void> {
    return this.http.delete<void>(`${CartEndPoint}/${ProductId}`, {
      headers: this.headers,
    });
  }

  getLoggedInUserCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${CartEndPoint}`, {
      headers: this.headers,
    });
  }

  clearUserCart(): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${CartEndPoint}` ,{
        headers : this.headers,
    })
  }
}
