import type { DeviceDetails } from '../types/device.types';

const DEVICE_API_URL = import.meta.env.VITE_DEVICE_API_URL;

interface ApiDeviceDetails {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
  cpu: string;
  ram?: string;
  internalMemory?: string[];
  os?: string;
  displayResolution: string;
  battery: string;
  primaryCamera?: string[];
  dimentions: string;
  weight: string;
  colors: string[];
}

function isApiDeviceDetails(data: unknown): data is ApiDeviceDetails {
  if (typeof data !== 'object' || data === null) return false;

  const record = data as Record<string, unknown>;

  return (
    typeof record.id === 'string' &&
    typeof record.brand === 'string' &&
    typeof record.model === 'string' &&
    typeof record.cpu === 'string'
  );
}

function mapDeviceDetailsFromApi(apiDetails: ApiDeviceDetails): DeviceDetails {
  return {
    id: apiDetails.id,
    brand: apiDetails.brand,
    model: apiDetails.model,
    price: apiDetails.price,
    imgUrl: apiDetails.imgUrl,
    cpu: apiDetails.cpu,
    ram: apiDetails.ram,
    internalMemory: apiDetails.internalMemory,
    os: apiDetails.os,
    displayResolution: apiDetails.displayResolution,
    battery: apiDetails.battery,
    primaryCamera: apiDetails.primaryCamera,
    dimentions: apiDetails.dimentions,
    weight: apiDetails.weight,
    colors: apiDetails.colors,
  };
}

export const fetchDeviceDetails = async (
  id: string | undefined,
): Promise<DeviceDetails> => {
  if (!id) return Promise.reject(new Error('Invalid ID'));

  const response = await fetch(`${DEVICE_API_URL}api/product/${id}`);

  if (!response.ok)
    throw new Error('Error al obtener los detalles del dispositivo');

  const data: unknown = await response.json();

  if (!isApiDeviceDetails(data)) {
    throw new Error('Invalid API response format');
  }

  return mapDeviceDetailsFromApi(data);
};
