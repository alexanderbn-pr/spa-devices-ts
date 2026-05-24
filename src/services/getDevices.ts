import type { Device } from '../types/device.types';

const DEVICE_API_URL = import.meta.env.VITE_DEVICE_API_URL;

interface ApiDevice {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
  ram?: string;
  internalMemory?: string[];
  os?: string;
}

function isApiDeviceArray(data: unknown): data is ApiDevice[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Record<string, unknown>).id === 'string' &&
        typeof (item as Record<string, unknown>).brand === 'string' &&
        typeof (item as Record<string, unknown>).model === 'string',
    )
  );
}

function mapDeviceFromApi(apiDevice: ApiDevice): Device {
  return {
    id: apiDevice.id,
    brand: apiDevice.brand,
    model: apiDevice.model,
    price: apiDevice.price,
    imgUrl: apiDevice.imgUrl,
    ram: apiDevice.ram,
    internalMemory: apiDevice.internalMemory,
    os: apiDevice.os,
  };
}

export const fetchDevices = async (): Promise<Device[]> => {
  const response = await fetch(`${DEVICE_API_URL}api/product`);

  if (!response.ok) throw new Error('Error al obtener los dispositivos');

  const data: unknown = await response.json();

  if (!isApiDeviceArray(data)) {
    throw new Error('Invalid API response format');
  }

  return data.map(mapDeviceFromApi);
};
