import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDevices } from './useDevices';
import * as getDevicesService from '../services/getDevices';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { devicesMock } from './mocks/useDevicesMocks';

// Mock del debounce para que sea inmediato en los tests y no tenga delay
vi.mock('@uidotdev/usehooks', () => ({
  useDebounce: (v) => v,
}));

function getWrapper() {
  //Desactivamos el retry para comprobar el error
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useDevices', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('devuelve los dispositivos del servicio', async () => {
    vi.spyOn(getDevicesService, 'fetchDevices').mockResolvedValue(devicesMock);

    const { result } = renderHook(() => useDevices(), {
      wrapper: getWrapper(),
    });

    await waitFor(() => {
      expect(result.current.devices).toEqual(devicesMock);
      expect(result.current.isLoadingDevices).toBe(false);
      expect(result.current.isErrorDevices).toBe(false);
    });
  });

  it('filtra dispositivos por nombre de marca o modelo', async () => {
    vi.spyOn(getDevicesService, 'fetchDevices').mockResolvedValue(devicesMock);

    const { result } = renderHook(() => useDevices(), {
      wrapper: getWrapper(),
    });

    await waitFor(() => result.current.devices !== undefined);

    act(() => {
      result.current.setSearchName('Apple');
    });

    await waitFor(() => {
      result.current.devices.length === 1;
      expect(result.current.devices[0].brand).toBe('Apple');
    });
  });

  it('devuelve error si fetchDevices falla', async () => {
    vi.spyOn(getDevicesService, 'fetchDevices').mockRejectedValue(
      new Error('API Error'),
    );

    const { result } = renderHook(() => useDevices(), {
      wrapper: getWrapper(),
    });

    await waitFor(() => expect(result.current.isErrorDevices).toBe(true));
  });
});
