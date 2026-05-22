import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { CURRENCY } from '../../constants';
const Device = ({ device }) => {
  const navigate = useNavigate();

  return (
    <section
      className="device-card"
      onClick={() => navigate(`/deviceDetails/${device.id}`)}
      aria-label="Ver detalles del dispositivo"
    >
      <img
        className="device-card-image"
        alt="image of device"
        src={device.imgUrl}
      />
      <div className="device-card-info">
        <p className="device-card-model">{device.brand} :</p>
        <p className="device-card-model">{device.model}</p>
      </div>
      <p className="device-card-info device-card-info-price">
        {device.price || 100} {CURRENCY}
      </p>
    </section>
  );
};

Device.propTypes = {
  device: PropTypes.object.isRequired,
};

export default React.memo(Device);
