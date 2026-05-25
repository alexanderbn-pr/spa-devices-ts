import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBreadcrumbDevice } from './useBreadcrumbDevice';
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

describe('useBreadcrumbDevice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns modelName when device details are fetched', async () => {
    vi.mocked(fetchDeviceDetails).mockResolvedValue({
      id: '123',
      model: 'iPhone 13',
      brand: 'Apple',
    } as DeviceDetails);

    const { result } = renderHook(() => useBreadcrumbDevice('123'), {
      wrapper: getWrapper(),
    });

    await waitFor(() => {
      expect(result.current.modelName).toBe('iPhone 13');
    });
  });

  it('returns isLoading as true initially', () => {
    vi.mocked(fetchDeviceDetails).mockResolvedValue({
      id: '123',
      model: 'iPhone 13',
    } as DeviceDetails);

    const { result } = renderHook(() => useBreadcrumbDevice('123'), {
      wrapper: getWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('returns undefined modelName when device is not found', async () => {
    vi.mocked(fetchDeviceDetails).mockResolvedValue(
      null as unknown as DeviceDetails,
    );

    const { result } = renderHook(() => useBreadcrumbDevice('nonexistent'), {
      wrapper: getWrapper(),
    });

    await waitFor(() => {
      expect(result.current.modelName).toBeUndefined();
    });
  });

  it('does not fetch when id is falsy', () => {
    const { result } = renderHook(
      () => useBreadcrumbDevice(null as unknown as string),
      {
        wrapper: getWrapper(),
      },
    );

    expect(fetchDeviceDetails).not.toHaveBeenCalled();
    expect(result.current.modelName).toBeUndefined();
  });
});
