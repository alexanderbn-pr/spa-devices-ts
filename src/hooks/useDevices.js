import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchDevices } from '../services/getDevices';
import { queryKeys } from '../lib/query-keys';
import { EXPIRATION } from '../constants';

/**
 * Hook for fetching devices
 * Uses useSuspenseQuery — suspends until data loads
 * Receives the already-debounced search as parameter
 * 
 * @param {string} debouncedSearch - filtered and debounced search
 * @returns {{ devices: array }}
 */
export const useDevices = (debouncedSearch = '') => {
  const { data: allDevices } = useSuspenseQuery({
    queryKey: queryKeys.devices.list({ search: debouncedSearch }),
    queryFn: () => fetchDevices(),
    staleTime: EXPIRATION,
    gcTime: EXPIRATION,
  });

  // Local filter
  const devices = useMemo(() => {
    if (!debouncedSearch || debouncedSearch.length === 0) {
      return allDevices;
    }
    return allDevices.filter((device) =>
      device.brand.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      device.model.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [allDevices, debouncedSearch]);

  return { devices };
};