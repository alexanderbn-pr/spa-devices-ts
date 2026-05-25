import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchDevices } from '../services/getDevices';
import { queryKeys } from '../lib/query-keys';
import { EXPIRATION } from '../constants';
import type { Device } from '../types/device.types';

export const useDevices = (debouncedSearch = '') => {
  const { data: allDevices } = useSuspenseQuery<Device[]>({
    queryKey: queryKeys.devices.list(debouncedSearch),
    queryFn: () => fetchDevices(),
    staleTime: EXPIRATION,
    gcTime: EXPIRATION,
  });

  const devices = useMemo(() => {
    if (!debouncedSearch || debouncedSearch.length === 0) {
      return allDevices;
    }
    return allDevices.filter(
      (device) =>
        device.brand.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        device.model.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [allDevices, debouncedSearch]);

  return { devices };
};
