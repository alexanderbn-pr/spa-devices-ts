import { useToastContext } from '../../contexts/ToastContext';
import { ToastContainer } from './index';

/**
 * ToastRenderer - Renders the ToastContainer at the app root level
 * Must be used within ToastProvider context
 */
const ToastRenderer = () => {
  const { toasts, dismissToast } = useToastContext();

  return (
    <ToastContainer toasts={toasts} onDismiss={dismissToast} />
  );
};

export { ToastRenderer };
export default ToastRenderer;
