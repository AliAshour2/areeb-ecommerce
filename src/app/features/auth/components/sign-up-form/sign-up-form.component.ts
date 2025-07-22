import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpData } from '../../../../shared/models/auth.model';
import { Router } from '@angular/router';
import { InputFieldComponent } from '../../../../shared/components/input-filed/input-field.component';
import { InputType } from '../../../../shared/components/input-filed/models/input-field.model';
import { TokenService } from '../../../../core/services/token/token.service';
import { GoogleButtonComponent } from "../../../../shared/components/google-button/google-button.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { ToastService } from '../../../../core/services/toast/toast.service';
import { NgxMaterialIntlTelInputComponent } from 'ngx-material-intl-tel-input';
@Component({
  selector: 'app-sign-up-form',
  imports: [NgxMaterialIntlTelInputComponent,ReactiveFormsModule, InputFieldComponent, GoogleButtonComponent, ButtonComponent],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css',
  standalone: true,
})
export class SignUpFormComponent {
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  private router = inject(Router);
  private tokenService = inject(TokenService);
  toast = inject(ToastService);
  InputType = InputType;
  constructor(private authService: AuthService) {}

  signUpForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
        ),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.checkPasswords }
  );

  checkPasswords(control: AbstractControl) {
    const group = control as FormGroup;
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      rePassword.setErrors({ ...rePassword.errors, notSame: true });
      return { notSame: true };
    } else {
      if (rePassword?.hasError('notSame')) {
        const errors = { ...rePassword.errors };
        delete errors['notSame'];
        if (Object.keys(errors).length === 0) {
          rePassword.setErrors(null);
        } else {
          rePassword.setErrors(errors);
        }
      }
      return null;
    }
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');  

 

    const signUpData: SignUpData = {
      name: this.signUpForm.value.name ?? '',
      email: this.signUpForm.value.email ?? '',
      password: this.signUpForm.value.password ?? '',
      rePassword: this.signUpForm.value.rePassword ?? '',
      phone: this.signUpForm.value.phone ?? '',
    };

    this.authService.signup(signUpData).subscribe({
      next: (reponse) => {
        this.isLoading.set(false);
        this.tokenService.setToken(reponse.token);
        this.toast.showSuccess("Sign up success");
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.toast.showError(error.error?.message);
        this.errorMessage.set(
          error.error?.message || 'Signup failed. Please try again.'
        );
        
      },
    });
  }
}
