export const ToastType = {
  Success: 'success',
  Error: 'error',
  Info: 'info',
} as const;

export type ToastType = (typeof ToastType)[keyof typeof ToastType];

export type ShowToastParams = {
  type: ToastType;
  message: string;
  duration?: number;
}
