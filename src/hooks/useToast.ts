import { useMemo } from 'react';
import { useToastContext } from '../contexts/ToastContext';

interface ToastOptions {
  duration?: number;
}

/**
 * Custom hook to expose toast convenience methods
 * Provides success, error, and info toast types
 */
export const useToast = () => {
  const { show } = useToastContext();

  const toast = useMemo(
    () => ({
      success: (message: string, options: ToastOptions = {}) => {
        return show({
          type: 'success' as const,
          message,
          duration: options.duration ?? 3000,
        });
      },

      error: (message: string, options: ToastOptions = {}) => {
        return show({
          type: 'error' as const,
          message,
          duration: options.duration ?? 5000,
        });
      },

      info: (message: string, options: ToastOptions = {}) => {
        return show({
          type: 'info' as const,
          message,
          duration: options.duration ?? 4000,
        });
      },
    }),
    [show],
  );

  return { toast };
};

export default useToast;
