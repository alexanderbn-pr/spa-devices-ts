import { useMemo } from 'react';
import { useToastContext } from '../contexts/ToastContext';

/**
 * Custom hook to expose toast convenience methods
 * Provides success, error, and info toast types
 */
export const useToast = () => {
  const { show } = useToastContext();

  const toast = useMemo(() => ({
    success: (message, options = {}) => {
      return show({
        type: 'success',
        message,
        duration: options.duration ?? 3000,
      });
    },

    error: (message, options = {}) => {
      return show({
        type: 'error',
        message,
        duration: options.duration ?? 5000,
      });
    },

    info: (message, options = {}) => {
      return show({
        type: 'info',
        message,
        duration: options.duration ?? 4000,
      });
    },
  }), [show]);

  return { toast };
};

export default useToast;