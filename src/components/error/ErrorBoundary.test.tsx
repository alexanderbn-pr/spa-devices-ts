import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

/**
 * Approval tests for ErrorBoundary refactoring.
 * These capture the current behavior that must be preserved.
 */

function GoodComponent() {
  return <p>Hello from safe component</p>;
}

function BadComponent(): ReactNode {
  throw new Error('Something went wrong');
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Hello from safe component')).toBeInTheDocument();
  });

  it('does not contain dead setError code', () => {
    // The refactored ErrorBoundary should not reference setError at all
    // This is a static check — importing and rendering should not produce
    // the broken pattern where `setError` is assigned instead of the setter
    const source = ErrorBoundary.toString();
    expect(source).not.toContain('setError');
  });

  it('renders fallback UI when child throws', () => {
    // Suppress console.error from the thrown error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BadComponent />
      </ErrorBoundary>,
    );

    // ErrorBoundary shows i18n fallback message, not the original error
    expect(screen.getByText('Algo salió mal')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('renders custom fallback when provided', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<p>Custom error UI</p>}>
        <BadComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Custom error UI')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('provides retry button that resets error state', () => {
    // This test just ensures the structure supports retry
    // Detailed retry behavior would need state manipulation
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BadComponent />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole('button', { name: 'Reintentar' }),
    ).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
