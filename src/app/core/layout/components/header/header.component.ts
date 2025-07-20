import { Component } from '@angular/core';
import { AuthService } from '../../../../features/auth/service/auth.service';
import { TokenService } from '../../../services/token/token.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
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
