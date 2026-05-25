import { ToastType } from '../../types';

type ToastProps = {
  id: string;
  type: ToastType;
  message: string;
  onDismiss: (id: string) => void;
}

const Toast = ({ id, type, message, onDismiss }: ToastProps) => {
  const handleDismiss = () => {
    onDismiss(id);
  };

  return (
    <div
      className={`toast toast--${type}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="toast__icon" aria-hidden="true">
        {type === 'success' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {type === 'error' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
        {type === 'info' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <span className="toast__message">{message}</span>
      <button
        className="toast__dismiss"
        onClick={handleDismiss}
        aria-label="Cerrar notificación"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Toast;
