import type { AddToCartPayload } from '../types/cart.types';

const DEVICE_API_URL = import.meta.env.VITE_DEVICE_API_URL;

interface ApiCartResponse {
  count?: number;
}

function isApiCartResponse(data: unknown): data is ApiCartResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    (typeof (data as Record<string, unknown>).count === 'number' ||
      (data as Record<string, unknown>).count === undefined)
  );
}

export const fetchAddDeviceCart = async (
  bodyData: AddToCartPayload,
): Promise<number> => {
  const response = await fetch(`${DEVICE_API_URL}api/cart`, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok)
    throw new Error('Error al añadir un producto al carrito');

  const data: unknown = await response.json();

  if (!isApiCartResponse(data)) {
    throw new Error('Invalid API response format');
  }

  return data.count ?? 0;
};
