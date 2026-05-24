export interface Device {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
  ram?: string;
  internalMemory?: string[];
  os?: string;
  [key: string]: unknown;
}

export interface DeviceDetails extends Device {
  cpu: string;
  displayResolution: string;
  battery: string;
  primaryCamera?: string[];
  dimentions: string;
  weight: string;
  colors: string[];
}

export type DeviceOption = {
  value: string;
  label: string;
}
