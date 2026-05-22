import React from 'react';
import { useDevices } from '../../hooks/useDevices';
import DeviceList from '../../components/deviceList/DeviceList';
import Search from '../../components/search/Search';
import './device.scss';

function Device() {
  const {
    getDevices,
    isLoadingDevices,
    isErrorDevices,
    devices,
    setSearchName,
    searchName,
  } = useDevices();

  return (
    <main className="devices-container">
      {isErrorDevices && (
        <section>
          <p className="error-message">
            Ha habido un error al obtenero los dispositivos
          </p>
          <button aria-label="Recargar dispositivos" onClick={() => getDevices}>
            Recargar dispositivos
          </button>
        </section>
      )}

      {isLoadingDevices ? (
        <p className="loading">Cargando...</p>
      ) : (
        <section className="devices-content">
          <article className="devices-content-header">
            <h3>Lista de dispositivos</h3>
            <Search valueSearch={searchName} setValue={setSearchName} />
          </article>
          <DeviceList devices={devices} />
        </section>
      )}
    </main>
  );
}

export default Device;
