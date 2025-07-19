import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignUpFormComponent } from "./features/auth/components/sign-up-form/sign-up-form.component";
import { SignInFormComponent } from "./features/auth/components/sign-in-form/sign-in-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SignInFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'areeb-ecommerce';
}
