import { Component, type ReactNode, type ErrorInfo } from 'react';
import i18n from '../../i18n';
import './ErrorBoundary.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  level?: 'section' | 'page' | 'full';
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * ErrorBoundary — Pure class component that catches render errors.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { level = 'section' } = this.props;

      return (
        <section className={`error-state ${level}`}>
          <p className="error-message">
            {i18n.t('error.generic')}
          </p>
          <button className="retry-button" onClick={this.handleReset}>
            {i18n.t('error.retry')}
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
