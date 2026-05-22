import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DeviceDetails from './DeviceDetails';
import userEvent from '@testing-library/user-event';
import { useDeviceDetails as useDeviceDetailsOriginal } from '../../hooks/useDeviceDetails';
import { useCart as useCartOriginal } from '../../hooks/useCart';

import { mockUseDeviceDetails } from '../../hooks/mocks/useDeviceDetailsMocks';
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function renderWithQueryClient(ui) {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
  );
}

//Carga un id de dispositivo
vi.mock('react-router-dom', async () => {
  const actual = await import('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: mockUseDeviceDetails.deviceDetails.id }),
  };
});

vi.mock('../../hooks/useDeviceDetails');
vi.mock('../../hooks/useCart');

describe('DeviceDetails', () => {
  let useDeviceDetailsMock;
  let useCartMock;

  beforeEach(() => {
    vi.clearAllMocks();
    useDeviceDetailsMock = vi.fn().mockReturnValue({ ...mockUseDeviceDetails });
    useCartMock = vi.fn().mockReturnValue({
      addToCart: vi.fn(),
      isLoadingAddingCart: false,
    });

    // Sobrescribimos los mocks
    useDeviceDetailsOriginal.mockImplementation(useDeviceDetailsMock);
    useCartOriginal.mockImplementation(useCartMock);
  });

  it('Renderiza correctamente la página', async () => {
    renderWithQueryClient(<DeviceDetails />);
    expect(screen.getByText(/Marca:/i)).toBeInTheDocument();
    expect(screen.getByText(/Modelo:/i)).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /image of device/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Añadir al carrito/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/170€/i)).toBeInTheDocument();
  });

  it('deshabilita el botón "Añadir al carrito" si no hay color seleccionado', async () => {
    useDeviceDetailsMock.mockReturnValueOnce({
      ...mockUseDeviceDetails,
      colorSelected: '',
    });
    renderWithQueryClient(<DeviceDetails />);
    const button = screen.getByRole('button', { name: /Añadir al carrito/i });
    expect(button).toBeDisabled();
  });

  it('Llama a addToCart al hacer click en el botón', async () => {
    const addToCart = vi.fn();
    useCartMock.mockReturnValueOnce({
      addToCart,
      isLoadingAddingCart: false,
    });
    renderWithQueryClient(<DeviceDetails />);
    const button = screen.getByRole('button', { name: /Añadir al carrito/i });
    await userEvent.click(button);
    expect(addToCart).toHaveBeenCalled();
  });

  it('Muestra el mensaje de carga', () => {
    useDeviceDetailsMock.mockReturnValueOnce({
      ...mockUseDeviceDetails,
      isLoadingDeviceDetails: true,
    });
    renderWithQueryClient(<DeviceDetails />);
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
  });

  it('Muestra el mensaje de error y el botón de recargar', () => {
    useDeviceDetailsMock.mockReturnValueOnce({
      ...mockUseDeviceDetails,
      isErrorDeviceDetails: true,
    });
    renderWithQueryClient(<DeviceDetails />);
    expect(screen.getByText(/Ha habido un error/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Recargar detalles/i }),
    ).toBeInTheDocument();
  });
});
