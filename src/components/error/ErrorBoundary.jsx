import { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../i18n';
import './ErrorBoundary.scss';

/**
 * ErrorBoundary — Pure class component that catches render errors.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
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
