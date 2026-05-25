import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDevices } from '../../../../hooks/useDevices';
import { useDevicesSearch } from '../../../../hooks/useDevicesSearch';
import { DeviceListSkeleton } from '../../../../components/deviceList/DeviceListSkeleton';
import DeviceList from '../../../../components/deviceList/deviceList';
import Search from '../../../../components/search/Search';
import ErrorBoundary from '../../../../components/error/ErrorBoundary';
import './device.scss';

interface DeviceContentProps {
  debouncedSearch: string;
}

function DeviceContent({ debouncedSearch }: DeviceContentProps) {
  const { devices } = useDevices(debouncedSearch);
  const { setSearchName } = useDevicesSearch();

  const handleClearFilters = () => {
    setSearchName('');
  };

  return <DeviceList devices={devices} onClearFilters={handleClearFilters} />;
}

function DevicePage() {
  const { t } = useTranslation();
  const { searchName, setSearchName, debouncedFilterName } =
    useDevicesSearch();

  return (
    <main className="devices-container">
      <ErrorBoundary>
        <section className="devices-content">
          <article className="devices-content-header">
            <h3>{t('nav.devices')}</h3>
            <div className="header-actions">
              <Link to="/device-table" className="btn-view-table">
                {t('device.viewTable')}
              </Link>
              <Search valueSearch={searchName} setValue={setSearchName} />
            </div>
          </article>

          <Suspense fallback={<DeviceListSkeleton count={6} />}>
            <DeviceContent debouncedSearch={debouncedFilterName} />
          </Suspense>
        </section>
      </ErrorBoundary>
    </main>
  );
}

export default DevicePage;
