import './DeviceTableSkeleton.scss';

/**
 * Skeleton for the device table
 * Used as Suspense fallback while data is loading
 * @param {Object} props
 * @param {number} props.count - Number of rows to display (default: 5)
 * @returns {JSX.Element}
 */
function DeviceTableSkeleton({ count = 5 }) {
  return (
    <div className="device-table-skeleton">
      <div className="skeleton-row">
        <div className="skeleton-img" style={{ width: 80 }} />
        <div className="skeleton-text skeleton-text-long" />
        <div className="skeleton-text skeleton-text-long" />
        <div className="skeleton-price" />
      </div>

      {/* Skeleton rows */}
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-img" />

          <div className="skeleton-text skeleton-text-short" />

          <div className="skeleton-text skeleton-text-long" />

          <div className="skeleton-price" />
        </div>
      ))}
    </div>
  );
}

DeviceTableSkeleton.defaultProps = {
  count: 5,
};

export { DeviceTableSkeleton };
export default DeviceTableSkeleton;