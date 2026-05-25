import './DeviceTableSkeleton.scss';

/**
 * Skeleton for the device table
 * Used as Suspense fallback while data is loading
 */
function DeviceTableSkeleton({ count = 5 }: { count?: number }) {
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

export { DeviceTableSkeleton };
export default DeviceTableSkeleton;
