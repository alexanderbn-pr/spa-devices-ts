/**
 * DeviceTable — Device-specific table
 * Uses the generic table with predefined columns for devices
 */

import { useNavigate } from 'react-router-dom';
import { Table } from '../Table/Table';

/**
 * Column configuration for the device table
 * Columns: imgUrl, brand, model, price
 */
const deviceColumns = [
  {
    key: 'imgUrl',
    label: 'Imagen',
    dataType: 'string',
    sortable: false,
    filterable: false,
    width: '80px',
    render: (device) => device.imgUrl 
      ? <img src={device.imgUrl} alt={device.model} style={{width: 64, height: 64, objectFit: 'cover', borderRadius: 8}} />
      : '—'
  },
  {
    key: 'brand',
    label: 'Marca',
    dataType: 'string',
    sortable: true,
    filterable: true,
  },
  {
    key: 'model',
    label: 'Modelo',
    dataType: 'string',
    sortable: true,
    filterable: true,
  },
  {
    key: 'price',
    label: 'Precio',
    dataType: 'number',
    sortable: true,
    filterable: true,
    render: (device) => `$${device.price ? device.price : '0.00'}`
  }
];

/**
 * Device table
 * @param {Object} props
 * @param {Array} props.devices - List of devices
 * @returns {JSX.Element}
 */
export function DeviceTable({ devices }) {
  const navigate = useNavigate();
  
  const handleRowClick = (device) => {
    navigate(`/deviceDetails/${device.id}`);
  };
  
  const tableConfig = {
    data: devices,
    columns: deviceColumns,
    paginated: true,
    pageSize: 15,
    searchable: true,
    searchableFields: ['brand', 'model'],
    debounceMs: 300,
    sortable: true,
    striped: true,
    hover: true,
    onRowClick: handleRowClick,
    rowClickable: true,
  };

  return <Table config={tableConfig} />;
}

export default DeviceTable;