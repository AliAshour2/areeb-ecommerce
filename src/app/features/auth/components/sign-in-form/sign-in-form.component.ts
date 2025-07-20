import { Component, inject, signal } from '@angular/core';
import { InputType } from '../../../../shared/components/input-filed/models/input-field.model';
import { TokenService } from '../../../../core/services/token/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInData } from '../../../../shared/models/auth.model';
import { InputFieldComponent } from "../../../../shared/components/input-filed/input-field.component";
import { GoogleButtonComponent } from "../../../../shared/components/google-button/google-button.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { ToastService } from '../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-sign-in-form',
  imports: [InputFieldComponent, ReactiveFormsModule, GoogleButtonComponent, ButtonComponent],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css',
})
export class SignInFormComponent {
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  private router = inject(Router);
  private toast = inject(ToastService);
  private tokenService = inject(TokenService);
  InputType = InputType;
  constructor(private authService: AuthService) { }
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
      ),
    ]),
  });


 
  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const signInData: SignInData = {
      email: this.signInForm.value.email ?? '',
      password: this.signInForm.value.password ?? '',
    };

    this.authService.signin(signInData).subscribe({
      next: (reponse) => {
        this.isLoading.set(false);
        this.tokenService.setToken(reponse.token);
        this.toast.showSuccess("Sign in success");
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.toast.showError("Sign in failed try again")
        this.errorMessage.set(
          error.error?.message || 'Signup failed. Please try again.'
        );
      },
    });
  }

}
