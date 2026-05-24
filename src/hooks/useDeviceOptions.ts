import { useState, useMemo, useEffect } from 'react';
import type { DeviceDetails, DeviceOption } from '../types/device.types';

/**
 * useDeviceOptions — Manages storage and color selection for a device.
 */
export const useDeviceOptions = (
  deviceDetails: DeviceDetails | null | undefined,
) => {
  const [storageSelected, setStorageSelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');

  const storages: DeviceOption[] = useMemo(
    () =>
      deviceDetails?.internalMemory?.map((mem) => ({
        value: mem,
        label: mem,
      })) ?? [],
    [deviceDetails?.internalMemory],
  );

  const colors: DeviceOption[] = useMemo(
    () =>
      deviceDetails?.colors?.map((color) => ({
        value: color,
        label: color,
      })) ?? [],
    [deviceDetails?.colors],
  );

  // Select first default value when none is selected
  useEffect(() => {
    if (storages.length > 0 && !storageSelected) {
      setStorageSelected(storages[0].value);
    }
  }, [storages, storageSelected]);

  useEffect(() => {
    if (colors.length > 0 && !colorSelected) {
      setColorSelected(colors[0].value);
    }
  }, [colors, colorSelected]);

  return {
    storages,
    storageSelected,
    setStorageSelected,
    colors,
    colorSelected,
    setColorSelected,
  };
};
