/**
 * EmptyState - Component for displaying empty/zero state messages
 *
 * @param {Object} props
 * @param {React.ReactNode|string} [props.icon] - Emoji or icon component
 * @param {string} props.title - Main message (required)
 * @param {string} [props.description] - Secondary text
 * @param {Object} [props.action] - Action button { label, onClick }
 *
 * @example
 * <EmptyState
 *   icon="📱"
 *   title="No devices found"
 *   description="Try a different search"
 *   action={{ label: 'Clear filters', onClick: handleClear }}
 * />
 */
function EmptyState({ icon, title, description, action }) {
  return (
    <div className="empty-state">
      {icon && <span className="empty-state__icon" aria-hidden="true">{icon}</span>}
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