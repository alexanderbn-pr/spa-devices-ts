import { useState, useMemo, useEffect } from 'react';

/**
 * useDeviceOptions — Manages storage and color selection for a device.
 *
 * @param {Object|null} deviceDetails - Device data with internalMemory and colors
 * @returns {{
 *   storages: Array<{ value: string, label: string }>,
 *   colors: Array<{ value: string, label: string }>,
 *   storageSelected: string,
 *   setStorageSelected: (value: string) => void,
 *   colorSelected: string,
 *   setColorSelected: (value: string) => void,
 * }}
 */
export const useDeviceOptions = (deviceDetails) => {
  const [storageSelected, setStorageSelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');

  const storages = useMemo(
    () =>
      deviceDetails?.internalMemory?.map((mem) => ({
        value: mem,
        label: mem,
      })) ?? [],
    [deviceDetails?.internalMemory],
  );

  const colors = useMemo(
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
