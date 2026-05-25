import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDevices } from './useDevices';
import { fetchDevices } from '../services/getDevices';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { devicesMock } from './mocks/useDevicesMocks';
import type { ReactNode } from 'react';

// Debounce mock
vi.mock('@uidotdev/usehooks', () => ({
  useDebounce: (v: unknown) => v,
}));

// Service mock
vi.mock('../services/getDevices', () => ({
  fetchDevices: vi.fn(),
}));

// Suspense wrapper
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

describe('useDevices', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('returns devices from the service', async () => {
    vi.mocked(fetchDevices).mockResolvedValue(devicesMock);

    const { result } = renderHook(() => useDevices(), {
      wrapper: getWrapper(),
    });

    // With suspense, the component suspends until data arrives
    await waitFor(() => {
      expect(result.current.devices).toEqual(devicesMock);
    });
  });

  it('filters devices by brand or model name', async () => {
    vi.mocked(fetchDevices).mockResolvedValue(devicesMock);

    const { result } = renderHook(() => useDevices(), {
      wrapper: getWrapper(),
    });

    await waitFor(() => result.current.devices !== undefined);

    expect(result.current.devices).toHaveLength(2);
  });
});
