import { Component } from '@angular/core';
import { AuthService } from '../../../../features/auth/service/auth.service';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  constructor( private tokenServices : TokenService){}

  get isAuthenticated(){
    return this.tokenServices.isAuthenticated();
  }
}
