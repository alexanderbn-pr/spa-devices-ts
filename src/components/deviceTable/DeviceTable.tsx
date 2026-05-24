/**
 * DeviceTable — Device-specific table
 * Uses the generic table with predefined columns for devices
 */

import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../Table/Table';
import type { Device } from '../../types/device.types';
import type { Column } from '../../types/table.types';

interface DeviceTableProps {
  devices: Device[];
}

type DeviceRecord = Device & Record<string, unknown>;

/**
 * Column configuration for the device table
 * Columns: imgUrl, brand, model, price
 */
const deviceColumns: Column<DeviceRecord>[] = [
  {
    key: 'imgUrl',
    label: 'Imagen',
    dataType: 'string',
    sortable: false,
    filterable: false,
    width: '80px',
    render: (device: Device): ReactNode =>
      device.imgUrl ? (
        <img
          src={device.imgUrl}
          alt={device.model}
          style={{
            width: 64,
            height: 64,
            objectFit: 'cover',
            borderRadius: 8,
          }}
        />
      ) : (
        '—'
      ),
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
    render: (device: Device): string =>
      `$${device.price ? device.price : '0.00'}`,
  },
];

/**
 * Device table
 */
export function DeviceTable({ devices }: DeviceTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (device: DeviceRecord) => {
    navigate(`/deviceDetails/${device.id}`);
  };

  const tableConfig = {
    data: devices,
    columns: deviceColumns,
    paginated: true,
    pageSize: 15,
    searchable: true,
    searchableFields: ['brand' as const, 'model' as const],
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
