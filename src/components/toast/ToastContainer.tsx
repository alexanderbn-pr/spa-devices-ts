import type { Toast } from '../../types';
import ToastComponent from './Toast';
import './Toast.scss';

type ToastContainerProps = {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-label="Notificaciones">
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
