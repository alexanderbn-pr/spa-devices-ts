/**
 * Integration Tests for DeviceDetailsPage (PDP — Product Detail Page)
 * Tests: detalle, selectores, add to cart, loading y error states
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DeviceDetailsPage from './DeviceDetailsPage';
import type { ReactNode } from 'react';
import type { DeviceDetails } from '../../../../types';

// Mock i18n — partial mock to keep initReactI18next for i18n module
vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return {
    ...actual,
    useTranslation: () => {
      const translations: Record<string, string> = {
        'cart.add': 'Añadir al carrito',
        'cart.adding': 'Añadiendo...',
        'common.productImage': 'Imagen del producto',
        'common.technicalSpecs': 'Especificaciones técnicas',
        'deviceDetails.processor': 'Procesador',
        'deviceDetails.ram': 'RAM',
        'deviceDetails.storage': 'Almacenamiento',
        'deviceDetails.os': 'Sistema Operativo',
        'deviceDetails.display': 'Pantalla',
        'deviceDetails.battery': 'Batería',
        'deviceDetails.camera': 'Cámara',
        'deviceDetails.dimensions': 'Dimensiones',
        'deviceDetails.weight': 'Peso',
        'deviceDetails.selectColor': 'Seleccionar color',
        'deviceDetails.selectStorage': 'Seleccionar almacenamiento',
        'deviceDetails.inStock': 'En stock',
        'deviceDetails.freeShipping': 'Envío gratis',
        'deviceDetails.freePickup': 'Recogida gratis',
        'deviceDetails.backToDevices': 'Volver a dispositivos',
        'error.loadingDetails':
          'Ha habido un error al obtener los dispositivos',
        'error.reload': 'Recargar detalles',
      };
      return {
        t: (key: string) => translations[key] || key,
      };
    },
  };
});

// Mutable mock references
const { mockUseDeviceDetails, mockUseDeviceOptions, mockUseCart } =
  vi.hoisted(() => ({
    mockUseDeviceDetails: vi.fn(),
    mockUseDeviceOptions: vi.fn(),
    mockUseCart: vi.fn(),
  }));

vi.mock('../../../../hooks/useDeviceDetails', () => ({
  useDeviceDetails: mockUseDeviceDetails,
}));

vi.mock('../../../../hooks/useDeviceOptions', () => ({
  useDeviceOptions: mockUseDeviceOptions,
}));

vi.mock('../../../../hooks/useCart', () => ({
  useCart: mockUseCart,
}));

const mockDeviceDetails = {
  id: 'ZmGrkLRPXOTpxsU4jjAcv',
  brand: 'Apple',
  model: 'iPhone 13',
  price: '999',
  imgUrl: '/test.jpg',
  cpu: 'A15 Bionic',
  ram: '6GB',
  internalMemory: ['64GB', '128GB', '256GB'],
  os: 'iOS 15',
  displayResolution: '2532x1170',
  battery: '3095mAh',
  primaryCamera: ['12MP'],
  dimentions: '146.7 x 71.5 x 7.65 mm',
  weight: '174',
  colors: ['Negro', 'Blanco', 'Azul'],
} satisfies DeviceDetails;

const mockDeviceOptions = {
  storages: [
    { value: '64GB', label: '64GB' },
    { value: '128GB', label: '128GB' },
    { value: '256GB', label: '256GB' },
  ],
  storageSelected: '128GB',
  setStorageSelected: vi.fn(),
  colors: [
    { value: 'Negro', label: 'Negro' },
    { value: 'Blanco', label: 'Blanco' },
    { value: 'Azul', label: 'Azul' },
  ],
  colorSelected: 'Negro',
  setColorSelected: vi.fn(),
};

function getWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter
        initialEntries={['/deviceDetails/ZmGrkLRPXOTpxsU4jjAcv']}
      >
        <Routes>
          <Route path="/deviceDetails/:id" element={children} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('DeviceDetailsPage — PDP Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mocks
    mockUseDeviceDetails.mockReturnValue({
      deviceDetails: mockDeviceDetails,
      isLoadingDeviceDetails: false,
      isErrorDeviceDetails: false,
      getDeviceDetails: vi.fn(),
    });

    mockUseDeviceOptions.mockReturnValue(mockDeviceOptions);

    mockUseCart.mockReturnValue({
      addToCart: vi.fn(),
      isLoadingAddingCart: false,
      isErrorAddingCart: false,
    });
  });

  // 3.6 PDP: detalle
  it('renders device brand, model, and specs', async () => {
    render(<DeviceDetailsPage />, { wrapper: getWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('iPhone 13')).toBeInTheDocument();
      expect(screen.getByText('A15 Bionic')).toBeInTheDocument();
      expect(screen.getByText('6GB')).toBeInTheDocument();
      expect(screen.getByText('iOS 15')).toBeInTheDocument();
    });
  });

  // 3.7 PDP: selectores
  it('renders color and storage selectors', async () => {
    render(<DeviceDetailsPage />, { wrapper: getWrapper() });

    await waitFor(() => {
      // Storage buttons by aria-label (avoid ambiguity with specs text)
      expect(
        screen.getByRole('button', { name: '128GB' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '64GB' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '256GB' }),
      ).toBeInTheDocument();
    });
  });

  it('shows selected storage as default', async () => {
    render(<DeviceDetailsPage />, { wrapper: getWrapper() });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: '128GB' }),
      ).toBeInTheDocument();
    });
  });

  // 3.8 PDP: add to cart
  it('renders Add to Cart button', async () => {
    render(<DeviceDetailsPage />, { wrapper: getWrapper() });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Añadir al carrito' }),
      ).toBeInTheDocument();
    });
  });

  it('calls addToCart when Add to Cart is clicked', async () => {
    const addToCart = vi.fn();
    mockUseCart.mockReturnValue({
      addToCart,
      isLoadingAddingCart: false,
      isErrorAddingCart: false,
    });

    const user = userEvent.setup();
    render(<DeviceDetailsPage />, { wrapper: getWrapper() });

    const addButton = await screen.findByRole('button', {
      name: 'Añadir al carrito',
    });

    await user.click(addButton);

    expect(addToCart).toHaveBeenCalledWith({
      id: 'ZmGrkLRPXOTpxsU4jjAcv',
      colorCode: 'Negro',
      storageCode: '128GB',
    });
  });

  // 3.9 PDP: loading + error
  it('shows loading skeleton when loading', () => {
    mockUseDeviceDetails.mockReturnValue({
      deviceDetails: null,
      isLoadingDeviceDetails: true,
      isErrorDeviceDetails: false,
      getDeviceDetails: vi.fn(),
    });

    const { container } = render(<DeviceDetailsPage />, {
      wrapper: getWrapper(),
    });

    // Should render skeleton elements (DeviceListSkeleton uses CSS class)
    expect(
      container.querySelector('.device-card-skeleton'),
    ).toBeInTheDocument();
  });

  it('shows error state when fetch fails', () => {
    mockUseDeviceDetails.mockReturnValue({
      deviceDetails: null,
      isLoadingDeviceDetails: false,
      isErrorDeviceDetails: true,
      getDeviceDetails: vi.fn(),
    });

    render(<DeviceDetailsPage />, { wrapper: getWrapper() });

    // Error message and reload button should be visible
    expect(
      screen.getByText('Ha habido un error al obtener los dispositivos'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Recargar detalles' }),
    ).toBeInTheDocument();
  });
});
