import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDeviceDetails } from './useDeviceDetails';
import { fetchDeviceDetails } from '../services/getDeviceDetails';
import type { ReactNode } from 'react';
import type { DeviceDetails } from '../types';

vi.mock('../services/getDeviceDetails', () => ({
  fetchDeviceDetails: vi.fn(),
}));

function getWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const mockDevice = {
  id: '123',
  brand: 'Apple',
  model: 'iPhone 13',
  price: '999',
  internalMemory: ['64GB', '128GB'],
  colors: ['Negro', 'Blanco'],
} as DeviceDetails;

describe('useDeviceDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns device details when fetch succeeds', async () => {
    vi.mocked(fetchDeviceDetails).mockResolvedValue(mockDevice);

    const { result } = renderHook(() => useDeviceDetails('123'), {
      wrapper: getWrapper(),
    });

    await waitFor(() => {
      expect(result.current.deviceDetails).toEqual(mockDevice);
    });
  });

  it('returns loading state initially', () => {
    vi.mocked(fetchDeviceDetails).mockResolvedValue(mockDevice);

    const { result } = renderHook(() => useDeviceDetails('123'), {
      wrapper: getWrapper(),
    });

    expect(result.current.isLoadingDeviceDetails).toBe(true);
  });

  it('does not include UI state properties', () => {
    vi.mocked(fetchDeviceDetails).mockResolvedValue(mockDevice);

    const { result } = renderHook(() => useDeviceDetails('123'), {
      wrapper: getWrapper(),
    });

    // The refactored hook should NOT expose UI state
    expect(result.current).not.toHaveProperty('storages');
    expect(result.current).not.toHaveProperty('colors');
    expect(result.current).not.toHaveProperty('storageSelected');
    expect(result.current).not.toHaveProperty('colorSelected');
  });

  it('returns refetch function', () => {
    vi.mocked(fetchDeviceDetails).mockResolvedValue(mockDevice);

    const { result } = renderHook(() => useDeviceDetails('123'), {
      wrapper: getWrapper(),
    });

    expect(typeof result.current.getDeviceDetails).toBe('function');
  });
});
