import { lazy, Suspense, type ComponentType } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from './components/header/header';
import ErrorBoundary from './components/error/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { ToastRenderer } from './components/toast/ToastProvider';

// Import i18n configuration
import './i18n';

// Route-based code splitting — each page loads only when needed
const Device = lazy(() => import('./features/devices/pages/device/DevicePage')) as ComponentType<object>;
const DeviceDetails = lazy(() => import('./features/devices/pages/deviceDetails/DeviceDetailsPage')) as ComponentType<object>;
const DeviceTable = lazy(() => import('./features/devices/pages/deviceTable/DeviceTablePage')) as ComponentType<object>;

// Loading fallback for Suspense
function LoadingFallback() {
  const { t } = useTranslation();
  return <div className="loading">{t('loading')}</div>;
}

// Global fallback for uncaught errors
function GlobalErrorFallback() {
  const { t } = useTranslation();
  return (
    <div className="loading">
      {t('error.generic')}
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <ToastRenderer />
        <Header />
        <ErrorBoundary fallback={<GlobalErrorFallback />}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Navigate to="/device" replace />} />
              <Route path="/device" element={<Device />} />
              <Route path="/deviceDetails/:id" element={<DeviceDetails />} />
              <Route path="/device-table" element={<DeviceTable />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </ToastProvider>
  );
}

export default App;
