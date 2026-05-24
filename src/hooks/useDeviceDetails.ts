import { useQuery } from '@tanstack/react-query';
import { fetchDeviceDetails } from '../services/getDeviceDetails';
import { queryKeys } from '../lib/query-keys';
import { EXPIRATION } from '../constants';
import type { DeviceDetails } from '../types/device.types';

export const useDeviceDetails = (id: string | undefined) => {
  const {
    data: deviceDetails,
    isLoading: isLoadingDeviceDetails,
    isError: isErrorDeviceDetails,
    refetch: getDeviceDetails,
  } = useQuery<DeviceDetails>({
    queryKey: queryKeys.devices.detail(id ?? ''),
    queryFn: () => fetchDeviceDetails(id),
    enabled: !!id,
    staleTime: EXPIRATION,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    getDeviceDetails,
    isLoadingDeviceDetails,
    isErrorDeviceDetails,
    deviceDetails,
  };
};
