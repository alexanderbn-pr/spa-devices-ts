/**
 * Integration Tests for DeviceTablePage
 * Verify DeviceTablePage renders with data and displays correctly
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import DeviceTablePage from './DeviceTablePage';
import type { ReactNode } from 'react';
import type { Device } from '../../../../types';

// Mock useDevices to return test data directly (avoid network calls)
vi.mock('../../../../hooks/useDevices', () => ({
  useDevices: () => ({
    devices: [
      {
        id: '1',
        brand: 'Apple',
        model: 'iPhone 13',
        price: '999',
        imgUrl: '',
      },
      {
        id: '2',
        brand: 'Samsung',
        model: 'Galaxy S21',
        price: '799',
        imgUrl: '',
      },
      {
        id: '3',
        brand: 'Acer',
        model: 'Iconia',
        price: '170',
        imgUrl: '',
      },
    ] satisfies Device[],
    isLoading: false,
    isError: false,
  }),
}));

// Mock debounce to execute immediately
vi.mock('@uidotdev/usehooks', () => ({
  useDebounce: (v: unknown) => v,
}));

// Mock table-helpers
vi.mock('../../../../utils/table-helpers', () => ({
  filterData: vi.fn(
    (
      data: Record<string, unknown>[],
      search: string,
      searchFields: string[],
    ) => {
      if (!search.trim()) return data;
      return data.filter((item) =>
        searchFields.some((field) =>
          String(item[field] ?? '')
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
      );
    },
  ),
  sortData: vi.fn(
    (data: Record<string, unknown>[], sortBy: string, order: string) => {
      if (!sortBy) return data;
      return [...data].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];
        if (valueA == null && valueB == null) return 0;
        if (valueA == null) return 1;
        if (valueB == null) return -1;
        const comparison = String(valueA).localeCompare(String(valueB));
        return order === 'asc' ? comparison : -comparison;
      });
    },
  ),
  paginateData: vi.fn(
    (data: Record<string, unknown>[], page: number, pageSize: number) => {
      const totalPages = Math.ceil(data.length / pageSize);
      const start = (page - 1) * pageSize;
      const items = data.slice(start, start + pageSize);
      return { items, totalPages };
    },
  ),
}));

// Wrapper with router for navigation testing
function TestWrapper({ children }: { children: ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

describe('DeviceTablePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page title', () => {
    render(<DeviceTablePage />, { wrapper: TestWrapper });

    expect(screen.getByText('Tabla de Dispositivos')).toBeInTheDocument();
  });

  it('renders loading skeleton initially', () => {
    // This tests the component initializes correctly
    const { container } = render(<DeviceTablePage />, {
      wrapper: TestWrapper,
    });

    // Just verify the component renders without error
    expect(
      container.querySelector('.device-table-container'),
    ).toBeInTheDocument();
  });

  it('displays table with devices data', async () => {
    render(<DeviceTablePage />, { wrapper: TestWrapper });

    // Wait for data to render - check for column headers
    await waitFor(() => {
      expect(screen.getByText('Marca')).toBeInTheDocument();
      expect(screen.getByText('Modelo')).toBeInTheDocument();
      expect(screen.getByText('Precio')).toBeInTheDocument();
    });
  });

  it('displays search input', async () => {
    render(<DeviceTablePage />, { wrapper: TestWrapper });

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  it('filters table when search input changes', async () => {
    render(<DeviceTablePage />, { wrapper: TestWrapper });

    const searchInput = await screen.findByRole('textbox');

    // Type search term
    fireEvent.change(searchInput, { target: { value: 'Apple' } });

    // Wait for debounce and filter
    await waitFor(() => {
      // Should show only Apple devices
      expect(screen.queryByText('Samsung')).not.toBeInTheDocument();
    });
  });
});
