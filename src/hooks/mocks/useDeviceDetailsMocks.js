import { vi } from 'vitest';

export const deviceDetailsMock = {
  id: 'ZmGrkLRPXOTpxsU4jjAcv',
  brand: 'Acer',
  model: 'Iconia Talk S',
  price: '170',
  imgUrl:
    'https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg',
  cpu: 'Snapdragon',
  ram: '4GB',
  os: 'Android',
  displayResolution: '1920x1080',
  battery: '4000mAh',
  primaryCamera: ['12MP'],
  dimentions: '150x75x8mm',
  weight: '180',
};

export const mockUseDeviceDetails = {
  deviceDetails: deviceDetailsMock,
  isLoadingDeviceDetails: false,
  isErrorDeviceDetails: false,
  getDeviceDetails: vi.fn(),
  storages: [
    { value: '64', label: '64GB' },
    { value: '128', label: '128GB' },
  ],
  storageSelected: '64',
  setStorageSelected: vi.fn(),
  colors: [
    { value: 'black', label: 'Negro' },
    { value: 'white', label: 'Blanco' },
  ],
  colorSelected: 'black',
  setColorSelected: vi.fn(),
};
