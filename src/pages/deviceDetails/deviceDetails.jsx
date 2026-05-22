import React from 'react';
import './device-details.scss';
import { useParams } from 'react-router-dom';
import { useDeviceDetails } from '../../hooks/useDeviceDetails';
import { CURRENCY, WEIGHT, UNKNOWN } from '../../constants';
import { useCart } from '../../hooks/useCart';

const DeviceDetails = () => {
  const { id } = useParams();
  const {
    deviceDetails,
    isLoadingDeviceDetails,
    isErrorDeviceDetails,
    getDeviceDetails,
    storages,
    storageSelected,
    setStorageSelected,
    colors,
    colorSelected,
    setColorSelected,
  } = useDeviceDetails(id);

  const { addToCart, isLoadingAddingCart } = useCart();

  const handleAddDeviceCart = (id, color, storage) => {
    addToCart({
      id,
      colorCode: color,
      storageCode: storage,
    });
  };

  const formatDetail = (value, suffix = '') =>
    value ? `${value}${suffix}` : UNKNOWN;

  if (isLoadingDeviceDetails) return <div className="loading">Cargando...</div>;
  if (isErrorDeviceDetails)
    return (
      <section>
        <p className="error-message">
          Ha habido un error al obtenero los dispositivos
        </p>
        <button aria-label="Recargar detalles" onClick={() => getDeviceDetails}>
          Recargar detalles
        </button>
      </section>
    );

  return (
    <main className="details-view">
      <section className="details-view-image">
        <img src={deviceDetails.imgUrl} alt="image of device" />
        <h3>{formatDetail(deviceDetails.price, CURRENCY)}</h3>
      </section>
      <section className="details-view-side">
        <aside className="details-view-side-text details-view-container">
          <p>
            <span>Marca: </span> {formatDetail(deviceDetails.brand)}
          </p>
          <p>
            <span>Modelo: </span> {formatDetail(deviceDetails.model)}
          </p>

          <p>
            <span>Cpu: </span> {formatDetail(deviceDetails.cpu)}
          </p>
          <p>
            <span>Memoria: </span> {formatDetail(deviceDetails.ram)}
          </p>
          <p>
            <span>Sistema operativo: </span> {formatDetail(deviceDetails.os)}
          </p>
          <p>
            <span>Resolución: </span>
            {formatDetail(deviceDetails.displayResolution)}
          </p>
          <p>
            <span>Bateria: </span> {formatDetail(deviceDetails.battery)}
          </p>
          <p>
            <span>Camara principal: </span>
            {formatDetail(deviceDetails.primaryCamera[0])}
          </p>
          <p>
            <span>Dimensiones: </span> {formatDetail(deviceDetails.dimentions)}
          </p>
          <p>
            <span>Peso: </span> {formatDetail(deviceDetails.weight, WEIGHT)}
          </p>
        </aside>
        <aside className="details-view-actions details-view-container">
          <div className="details-view-actions-selects">
            <span>Color: </span>
            <select
              value={colorSelected}
              onChange={(e) => setColorSelected(e.target.value)}
            >
              {colors.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="details-view-actions-selects">
            <span>Almacenamiento: </span>
            <select
              value={storageSelected}
              onChange={(e) => setStorageSelected(e.target.value)}
            >
              {storages.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            disabled={!storageSelected || !colorSelected || isLoadingAddingCart}
            onClick={() =>
              handleAddDeviceCart(id, colorSelected, storageSelected)
            }
            aria-label="Añadir al carrito"
          >
            {isLoadingAddingCart ? 'Añadiendo...' : 'Añadir al carrito'}
          </button>
        </aside>
      </section>
    </main>
  );
};

export default DeviceDetails;
