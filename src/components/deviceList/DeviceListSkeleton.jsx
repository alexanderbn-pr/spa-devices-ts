/**
 * Skeleton shown while devices are loading
 */
import { useTranslation } from 'react-i18next';

const DeviceListSkeleton = ({ count = 8 }) => {
  const { t } = useTranslation();

  return (
    <section className="devices-list" aria-busy="true" aria-label={t('loadingDevices')}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="device-card device-card-skeleton"
          aria-hidden="true"
        >
          <div className="device-card-image-skeleton" />

          <div className="device-card-info-skeleton">
            <div className="device-card-model-skeleton" />
            <div className="device-card-model-skeleton model-short" />
          </div>

          <div className="device-card-price-skeleton" />
        </div>
      ))}
    </section>
  );
};

DeviceListSkeleton.defaultProps = {
  count: 8,
};

export { DeviceListSkeleton };
export default DeviceListSkeleton;