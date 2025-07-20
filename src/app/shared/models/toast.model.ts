export type ToastType = 'success' | 'error' | 'loading' | null;
export interface ToastState {
    message: string;
    type: ToastType;
  }