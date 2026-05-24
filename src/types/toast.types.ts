import type { ToastType } from './api.types';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

export interface ToastContextValue {
  toasts: Toast[];
  show: (params: import('./api.types').ShowToastParams) => string;
  dismissToast: (id: string) => void;
}
