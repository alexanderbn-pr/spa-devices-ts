/**
 * DeviceTablePage — Device table page
 */

import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDevices } from '../../../../hooks/useDevices';
import DeviceTable from '../../../../components/deviceTable/DeviceTable';
import { DeviceTableSkeleton } from '../../../../components/deviceTable/DeviceTableSkeleton';
import ErrorBoundary from '../../../../components/error/ErrorBoundary';
import './DeviceTablePage.scss';

/**
 * Content that consumes the data (suspends)
 */
function DeviceTableContent() {
  const { devices } = useDevices('');
  return <DeviceTable devices={devices} />;
}

/**
 * Main page component
 */
function DeviceTablePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="device-table-container">
      <ErrorBoundary>
        <section className="device-table-content">
          <article className="device-table-header">
            <div className="header-left">
              <button
                className="btn-back"
                onClick={() => navigate('/device')}
              >
                ← {t('deviceTable.back')}
              </button>
              <h3>{t('deviceTable.title')}</h3>
            </div>
            <p className="header-subtitle">{t('deviceTable.subtitle')}</p>
          </article>

          <Suspense fallback={<DeviceTableSkeleton count={5} />}>
            <DeviceTableContent />
          </Suspense>
        </section>
      </ErrorBoundary>
    </main>
  );
}

export default DeviceTablePage;
