import { useQuery } from '@tanstack/react-query';
import { fetchDevices } from '../services/getDevices';
import { useDebounce } from '@uidotdev/usehooks';
import { useMemo, useState } from 'react';
import { EXPIRATION } from '../constants';
export const useDevices = () => {
  const [searchName, setSearchName] = useState('');
  const debouncedFilterName = useDebounce(searchName, 250);

  const {
    data: devices,
    isLoading: isLoadingDevices,
    isError: isErrorDevices,
    refetch: getDevices,
  } = useQuery({
    queryKey: ['devices'],
    queryFn: () => fetchDevices(),
    staleTime: EXPIRATION,
    cacheTime: EXPIRATION,
    refetchOnWindowFocus: false,
  });

  const filteredDevices = useMemo(() => {
    return searchName != '' && searchName.length > 0
      ? devices.filter((device) => {
          return (
            device.brand.toLowerCase().includes(searchName.toLowerCase()) ||
            device.model.toLowerCase().includes(searchName.toLowerCase())
          );
        })
      : devices;
  }, [devices, debouncedFilterName]);

  return {
    getDevices,
    isLoadingDevices,
    isErrorDevices,
    devices: filteredDevices,
    setSearchName,
  };
};
