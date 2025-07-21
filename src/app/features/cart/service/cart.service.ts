import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '../../../core/services/token/token.service';
import { CartEndPoint } from '../../../shared/constants/app.constants';

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


  updateCartProductQuantity(productId : string , count : number){
    const headers = this.tokenService.getAuthHeaders();
    const body = {count};
    return this.http.put(`${CartEndPoint}/${productId}`, body, { headers });
  }


  getLoggedInUserCart(){
    const headers = this.tokenService.getAuthHeaders();
    return this.http.get(`${CartEndPoint}`, {headers});
  }

}
