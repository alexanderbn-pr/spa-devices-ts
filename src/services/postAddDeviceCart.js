const DEVICE_API_URL = import.meta.env.VITE_DEVICE_API_URL;

export const fetchAddDeviceCart = async (
 bodyData
) => {
  return await fetch(`${DEVICE_API_URL}api/cart`, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error al añadir un producto al carrito');
      return res?.json();
    })
    .then((data) => {
      return data.count ?? 0;
    });
};