/**
 * EmptyState - Component for displaying empty/zero state messages
 *
 * @example
 * <EmptyState
 *   icon="📱"
 *   title="No devices found"
 *   description="Try a different search"
 *   action={{ label: 'Clear filters', onClick: handleClear }}
 * />
 */

import type { ReactNode } from 'react';
import type { EmptyStateAction } from '../../../types/ui.types';

type EmptyStateProps = {
  icon?: ReactNode | string;
  title: string;
  description?: string;
  action?: EmptyStateAction;
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon && (
        <span className="empty-state__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__description">{description}</p>}
      {action && (
        <button
          className="empty-state__action"
          onClick={action.onClick}
          type="button"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
