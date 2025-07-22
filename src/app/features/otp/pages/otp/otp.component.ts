import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {

  otp = signal<number[]>([0, 0, 0, 0, 0, 0]);

  isOtpComplete = signal(false);

  // Timer related signals
  timeLeft = signal(30);
  timerActive = signal(true);
  canResend = signal(false);
  otpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const otp = this.otp();
      this.isOtpComplete.set(otp.every(digit => digit !== 0));
    });

    this.otpForm = this.fb.group({
      otp: this.fb.array(
        // Add Validators.required here
        Array(6).fill('').map(() => this.fb.control('', [
          Validators.required,
          Validators.pattern(/^\d$/) // Also good to keep this validator
        ]))
      )
    });


    this.startTimer();
  }

  get otpArray(): FormArray {
    return this.otpForm.get('otp') as FormArray;
  }


  startTimer() {
    this.timerActive.set(true);
    this.timeLeft.set(30);
    const timer = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(time => time - 1);
      } else {
        clearInterval(timer);
        this.timerActive.set(false);
        this.canResend.set(true);
      }
    }, 500);
  };

  // Verify OTP
  verifyOtp() {
    if (!this.canResend()) return;

    const otp = this.otp();
    console.log(otp);
  }


  // Handle input changes
  onInputChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Update the OTP array
    const newOtp = [...this.otp()];
    newOtp[index] = Number(value);
    this.otp.set(newOtp);

    // Auto-focus next input if there's a value
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }



  // Resend OTP 
  resendOtp() {
    this.startTimer();
    const firstInput = document.getElementById('otp-0') as HTMLInputElement;
    if (firstInput) firstInput.focus();
  }
}
