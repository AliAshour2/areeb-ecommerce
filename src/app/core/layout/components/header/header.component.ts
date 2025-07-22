import { Component, inject,  signal } from '@angular/core';

import { AuthService } from '../../../../features/auth/service/auth.service';
import { TokenService } from '../../../services/token/token.service';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../../features/cart/service/cart.service';
import { Observable, tap } from 'rxjs';
import { CartResponse } from '../../../../shared/models/cart.model';
import { CartEndPoint } from '../../../../shared/constants/app.constants';


@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  constructor( private tokenServices : TokenService){}

  cartItemsCount =signal<number>(0);
  private cartService = inject(CartService);

  
   
  get isAuthenticated(){
    return this.tokenServices.isAuthenticated();
  }



  
}
