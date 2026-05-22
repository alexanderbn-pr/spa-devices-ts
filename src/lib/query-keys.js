/**
 * Query Key Factory - Patrón centralizado para todas las query keys
 * Asegura consistencia y previene bugs de caché
 */
export const queryKeys = {
  devices: {
    all: Object.freeze(['devices']),
    lists: () => Object.freeze([...queryKeys.devices.all, 'list']),
    list: (search) => Object.freeze([...queryKeys.devices.lists(), { search }]),
    details: () => Object.freeze([...queryKeys.devices.all, 'detail']),
    detail: (id) => Object.freeze([...queryKeys.devices.details(), id]),
  },
  cart: {
    all: Object.freeze(['cart']),
    count: () => Object.freeze([...queryKeys.cart.all, 'count']),
  },
};

Object.freeze(queryKeys.devices);
Object.freeze(queryKeys.cart);