const DEVICE_API_URL = import.meta.env.VITE_DEVICE_API_URL;

export const fetchDevices = async () => {
  return await fetch(`${DEVICE_API_URL}api/product`)
    .then((res) => {
      if (!res.ok) throw new Error('Error al obtener los dispositivos');
      return res?.json() ?? [];
    })
};
