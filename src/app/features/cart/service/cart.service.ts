import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '../../../core/services/token/token.service';
import { CartEndPoint } from '../../../shared/constants/app.constants';
import {  Observable } from 'rxjs';
import { CartResponse } from '../../../shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  private tokenService = inject(TokenService)


  addProductToCart(productId: string) {
    const headers = this.tokenService.getAuthHeaders();
    const body = { productId };
    return this.http.post(CartEndPoint, body, { headers })
  }


  updateCartProductQuantity(productId: string, count: number): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();
    const body = { count };
    return this.http.put(`${CartEndPoint}/${productId}`, body, { headers });
  }


  RemoveSpecificCartItem(ProductId: string): Observable<void> {
    const headers = this.tokenService.getAuthHeaders();
    return this.http.delete<void>(`${CartEndPoint}/${ProductId}`, { headers });
  }


  getLoggedInUserCart(): Observable<CartResponse> {
    const headers = this.tokenService.getAuthHeaders();
    return this.http.get<CartResponse>(`${CartEndPoint}`, { headers })
  }

  

}
