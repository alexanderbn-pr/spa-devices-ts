import { Link, useLocation, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBreadcrumbDevice } from '../../hooks/useBreadcrumbDevice';

import './breadcrumb.scss';

const Breadcrumbs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const match = useMatch('/deviceDetails/:id');
  const id = match?.params?.id;
  const { modelName } = useBreadcrumbDevice(id);

  if (location.pathname === '/device') {
    return (
      <nav className="breadcrumb">
        <strong>
          <span>{t('nav.devices')}</span>
        </strong>
      </nav>
    );
  }

  if (location.pathname.includes('/deviceDetails/')) {
    return (
      <nav className="breadcrumb">
        <Link to="/device">{t('nav.devices')}</Link>
        <span> / </span>
        <strong>
          <span>{modelName}</span>
        </strong>
      </nav>
    );
  }

  return null;
};

export default Breadcrumbs;
