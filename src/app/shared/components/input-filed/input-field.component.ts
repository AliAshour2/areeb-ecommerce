import { Component, effect, input, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputType } from './models/input-field.model';

@Component({
  selector: 'app-input-field',
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
  standalone: true,
})
export class InputFieldComponent {
  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  type = input<InputType>(InputType.Text);
  control = input<FormControl | undefined>(undefined);
  showPassword = signal(false);
  showPasswordToggle = input<boolean>(false);


  
  get InputType() {
    return this.showPasswordToggle() && this.type() === InputType.Password
      ? this.showPassword()
        ? InputType.Text
        : InputType.Password
      : this.type();
  }

  togglePasswordVisibility() {
    this.showPassword.update((show) => !show);
  }

  hasError() {
    return (
      this.control()?.invalid &&
      (this.control()?.dirty || this.control()?.touched)
    );
  }
}
