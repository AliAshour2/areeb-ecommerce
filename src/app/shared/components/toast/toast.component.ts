import { Component, input } from '@angular/core';
import { ToastType } from '../../models/toast.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  message = input<string>('');
  type = input<ToastType>('success');
}
