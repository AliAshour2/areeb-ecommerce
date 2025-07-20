import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { RouterOutlet } from "../../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
