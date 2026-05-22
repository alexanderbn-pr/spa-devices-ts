const DEVICE_API_URL = import.meta.env.VITE_DEVICE_API_URL;

export const fetchDeviceDetails = async (id) => {
  if (!id) return [];
  return await fetch(`${DEVICE_API_URL}api/product/${id}`).then((res) => {
    if (!res.ok)
      throw new Error('Error al obtener los detalles del dispositivo');
    return res?.json();
  });
};
