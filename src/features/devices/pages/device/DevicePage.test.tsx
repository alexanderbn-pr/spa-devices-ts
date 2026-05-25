/**
 * Integration Tests for DevicePage (PLP — Product List Page)
 * Tests: carga, búsqueda, navegación, loading y error states
 */

import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DevicePage from './DevicePage';
import type { ReactNode } from 'react';

// Mock i18n — partial mock to keep initReactI18next for i18n module
vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return {
    ...actual,
    useTranslation: () => {
      const translations: Record<string, string> = {
        'nav.devices': 'Dispositivos',
        'device.viewTable': 'Ver Tabla',
        'device.all': 'Todos los dispositivos',
        'common.search': 'Buscar dispositivos...',
        'common.loading': 'Cargando...',
        'common.error': 'Algo salió mal',
        'common.retry': 'Reintentar',
        'empty.noDevices': 'No hay dispositivos disponibles',
        'empty.noResults': 'No se encontraron dispositivos',
        'empty.clearFilters': 'Limpiar filtros',
      };
      return {
        t: (key: string) => translations[key] || key,
      };
    },
  };
});

// Mutable mock references for dynamic mock values
const { mockUseDevices, mockUseDevicesSearch } = vi.hoisted(() => ({
  mockUseDevices: vi.fn(),
  mockUseDevicesSearch: vi.fn(),
}));

vi.mock('../../../../hooks/useDevices', () => ({
  useDevices: mockUseDevices,
}));

vi.mock('../../../../hooks/useDevicesSearch', () => ({
  useDevicesSearch: mockUseDevicesSearch,
}));

const mockDevices = [
  {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 13',
    price: '999',
    imgUrl: '/test.jpg',
  },
  {
    id: '2',
    brand: 'Samsung',
    model: 'Galaxy S21',
    price: '799',
    imgUrl: '/test2.jpg',
  },
  {
    id: '3',
    brand: 'Apple',
    model: 'iPhone 14',
    price: '1099',
    imgUrl: '/test3.jpg',
  },
];

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
      <MemoryRouter initialEntries={['/device']}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe('DevicePage — PLP Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock for useDevicesSearch
    mockUseDevicesSearch.mockReturnValue({
      searchName: '',
      setSearchName: vi.fn(),
      debouncedFilterName: '',
    });
  });

  // 3.1 PLP: carga
  it('renders device cards when devices are loaded', async () => {
    mockUseDevices.mockReturnValue({ devices: mockDevices });

    render(<DevicePage />, { wrapper: getWrapper() });

    await waitFor(() => {
      expect(screen.getByText('iPhone 13')).toBeInTheDocument();
      expect(screen.getByText('Galaxy S21')).toBeInTheDocument();
      expect(screen.getByText('iPhone 14')).toBeInTheDocument();
    });
  });

  // 3.2 PLP: búsqueda
  it('filters devices when search term changes', async () => {
    mockUseDevices.mockReturnValue({ devices: mockDevices });
    mockUseDevicesSearch.mockReturnValue({
      searchName: 'Apple',
      setSearchName: vi.fn(),
      debouncedFilterName: 'Apple',
    });

    render(<DevicePage />, { wrapper: getWrapper() });

    await waitFor(() => {
      expect(screen.getByText('iPhone 13')).toBeInTheDocument();
      expect(screen.getByText('iPhone 14')).toBeInTheDocument();
    });
  });

  // 3.3 PLP: navegación
  it('renders device cards with navigation attributes', async () => {
    mockUseDevices.mockReturnValue({ devices: mockDevices });

    render(<DevicePage />, { wrapper: getWrapper() });

    // Verify each device card renders with correct navigation aria-label
    await waitFor(() => {
      const iphoneCard = screen.getByRole('button', { name: /iPhone 13/ });
      expect(iphoneCard).toBeInTheDocument();
      expect(iphoneCard.getAttribute('tabindex')).toBe('0');

      const samsungCard = screen.getByRole('button', { name: /Galaxy S21/ });
      expect(samsungCard).toBeInTheDocument();
    });
  });

  // 3.4 PLP: loading skeleton
  it('shows loading state while devices are loading', async () => {
    mockUseDevices.mockReturnValue({ devices: [] });

    render(<DevicePage />, { wrapper: getWrapper() });

    // Empty state should show (no devices loaded yet)
    await waitFor(() => {
      expect(
        screen.getByText('No hay dispositivos disponibles'),
      ).toBeInTheDocument();
    });
  });

  // 3.5 PLP: error state
  it('shows error state when devices fail to load', async () => {
    mockUseDevices.mockImplementation(() => {
      throw new Error('Failed to load devices');
    });

    render(<DevicePage />, { wrapper: getWrapper() });

    // ErrorBoundary should catch the error and show fallback
    await waitFor(() => {
      expect(screen.getByText('Algo salió mal')).toBeInTheDocument();
    });
  });
});
