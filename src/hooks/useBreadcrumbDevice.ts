import { useQuery } from '@tanstack/react-query';
import { fetchDeviceDetails } from '../services/getDeviceDetails';
import { queryKeys } from '../lib/query-keys';
import type { DeviceDetails } from '../types/device.types';

/**
 * useBreadcrumbDevice — Minimal TanStack Query hook for the breadcrumb.
 * Reuses the same queryKey as useDeviceDetails for cache sharing.
 */
export const useBreadcrumbDevice = (id: string | undefined) => {
  const { data: deviceDetails, isLoading } = useQuery<DeviceDetails>({
    queryKey: queryKeys.devices.detail(id ?? ''),
    queryFn: () => fetchDeviceDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    modelName: deviceDetails?.model,
    isLoading,
  };
};
