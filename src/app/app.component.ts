import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./shared/components/toast/toast.component";
import { SignInFormComponent } from "./features/auth/components/sign-in-form/sign-in-form.component";
import { MainLayoutComponent } from "./core/layout/main-layout/main-layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, SignInFormComponent, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'areeb-ecommerce';
}
