import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

/**
 * ToastContext - Provides toast notification state and management
 * Manages a stack of toasts with auto-dismiss and max 3 visible
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const dismissToast = useCallback((id) => {
    // Clear the timer for this toast
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }

    setToasts((prev) => {
      const filtered = prev.filter((t) => t.id !== id);
      return filtered;
    });
  }, []);

  const show = useCallback(({ type, message, duration = 3000 }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    setToasts((prev) => {
      // Keep max 3 visible toasts
      const updated = [...prev, { id, type, message, duration }];
      if (updated.length > 3) {
        // Remove the oldest toast
        const oldest = updated.shift();
        const timer = timersRef.current.get(oldest.id);
        if (timer) {
          clearTimeout(timer);
          timersRef.current.delete(oldest.id);
        }
      }
      return updated;
    });

    // Auto-dismiss logic
    const timer = setTimeout(() => {
      dismissToast(id);
    }, duration || 3000);

    timersRef.current.set(id, timer);

    return id;
  }, [dismissToast]);

  const value = {
    toasts,
    show,
    dismissToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

/**
 * Custom hook to access toast functionality
 * Must be used within ToastProvider
 */
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;