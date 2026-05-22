import { Link, useLocation, useMatch } from 'react-router-dom';
import { useDeviceDetails } from '../../hooks/useDeviceDetails'; // importa tu hook

import './breadcrumb.scss';

const Breadcrumbs = () => {
  const location = useLocation();
  const match = useMatch('/deviceDetails/:id');
  const id = match?.params?.id;
  const { deviceDetails } = useDeviceDetails(id);
  let model;

  if (location.pathname === '/device') {
    return (
      <nav className="breadcrumb">
        <strong>
          <span>Dispositivos</span>
        </strong>
      </nav>
    );
  }

  if (location.pathname.includes('/deviceDetails/')) {
    model = deviceDetails?.model;

    return (
      <nav className="breadcrumb">
        <Link to="/device">Dispositivos</Link>
        <span> / </span>
        <strong>
          <span>{model}</span>
        </strong>
      </nav>
    );
  }
  return null;
};

export default Breadcrumbs;
