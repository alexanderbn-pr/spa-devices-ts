import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import DeviceCard from './device';
import EmptyState from '../ui/EmptyState';
import type { Device } from '../../types/device.types';
import '../deviceList/device-list.scss';

type DeviceListProps = {
  devices: Device[];
  onClearFilters?: () => void;
}

const DeviceList = memo(({ devices, onClearFilters }: DeviceListProps) => {
  const { t } = useTranslation();

  if (devices.length === 0) {
    return (
      <EmptyState
        icon="📱"
        title={t('empty.noResults')}
        description={t('empty.noDevices')}
        action={onClearFilters ? { label: t('empty.clearFilters'), onClick: onClearFilters } : undefined}
      />
    );
  }

  return (
    <section className="devices-list">
      {devices.map((device) => (
        <DeviceCard device={device} key={device.id} />
      ))}
    </section>
  );
});

export default DeviceList;
