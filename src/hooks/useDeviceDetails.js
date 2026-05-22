import { useQuery } from '@tanstack/react-query';
import { fetchDeviceDetails } from '../services/getDeviceDetails.js';
import { useEffect, useState } from 'react';
import { EXPIRATION } from '../constants.js';
export const useDeviceDetails = (id) => {
  const [storages, setStorages] = useState([]);
  const [storageSelected, setStorageSelected] = useState('');
  const [colors, setColors] = useState([]);
  const [colorSelected, setColorSelected] = useState('');
  const {
    data: deviceDetails,
    isLoading: isLoadingDeviceDetails,
    isError: isErrorDeviceDetails,
    refetch: getDeviceDetails,
  } = useQuery({
    queryKey: ['deviceDetail', id],
    queryFn: () => fetchDeviceDetails(id),
    enabled: !!id,
    staleTime: EXPIRATION,
    cacheTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    //Selector de almacenamiento
    if (deviceDetails && deviceDetails.internalMemory) {
      const optionsStorages = deviceDetails.internalMemory.map((mem) => ({
        value: mem,
        label: mem,
      }));
      setStorages(optionsStorages);
      if (optionsStorages.length > 0) {
        setStorageSelected(optionsStorages[0].value);
      }
    }
    //Selector de colores
    if (deviceDetails && deviceDetails.colors) {
      const optionsColors = deviceDetails.colors.map((color) => ({
        value: color,
        label: color,
      }));
      setColors(optionsColors);
      if (optionsColors.length > 0) {
        setColorSelected(optionsColors[0].value);
      }
    }
  }, [deviceDetails]);

  return {
    getDeviceDetails,
    isLoadingDeviceDetails,
    isErrorDeviceDetails,
    deviceDetails,
    storages,
    storageSelected,
    setStorageSelected,
    colors,
    colorSelected,
    setColorSelected,
  };
};
