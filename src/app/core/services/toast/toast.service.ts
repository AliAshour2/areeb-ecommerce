import { Injectable, signal } from '@angular/core';
import { ToastState, ToastType } from '../../../shared/models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast = signal<ToastState>({ message: '', type: null });
  
  showError(message: string) {
    this.toast.set({ message, type: 'error'  });
    setTimeout(() => this.clear(), 3000);
  }

  showLoading(message: string = 'Loading...') {
    this.toast.set({ message, type: 'loading' });
  }

  showSuccess(message: string) {
    this.toast.set({ message, type: 'success' });
    setTimeout(() => this.clear(), 3000);
  }

  clear() {
    this.toast.set({ message: '', type: null });
  }
}
