import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { ToastService } from '../../services/toast/toast.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, RouterOutlet, SidebarComponent , RouterOutlet , ToastComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  standalone: true
})
export class MainLayoutComponent {
  private toastService = inject(ToastService);

  get toast(){
    return this.toastService.toast;
  }
}
