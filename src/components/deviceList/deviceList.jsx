import './device-list.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Device from '../deviceList/device';

const DeviceList = ({ devices }) => {
  return (
    <section className="devices-list">
      {devices.length > 0 &&
        devices.map((device) => <Device device={device} key={device.id} />)}
    </section>
  );
};

DeviceList.propTypes = {
  devices: PropTypes.array.isRequired,
};

export default React.memo(DeviceList);
