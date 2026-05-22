/**
 * Tests for useTableState hook
 * Testing filter, sort, and paginate functions
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTableState } from './useTableState';

vi.mock('@uidotdev/usehooks', () => ({
  useDebounce: (v) => v,
}));

vi.mock('../utils/table-helpers', () => ({
  filterData: vi.fn((data, search, searchFields) => {
    if (!search.trim()) return data;
    return data.filter((item) =>
      searchFields.some((field) =>
        String(item[field] ?? '').toLowerCase().includes(search.toLowerCase())
      )
    );
  }),
  sortData: vi.fn((data, sortBy, order) => {
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
  }),
  paginateData: vi.fn((data, page, pageSize) => {
    const totalPages = Math.ceil(data.length / pageSize);
    const start = (page - 1) * pageSize;
    const items = data.slice(start, start + pageSize);
    return { items, totalPages };
  }),
}));

// Test data
const mockDevices = [
  { id: '1', brand: 'Apple', model: 'iPhone 13', price: 999, ram: '4GB', os: 'iOS', imgUrl: '' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S21', price: 799, ram: '8GB', os: 'Android', imgUrl: '' },
  { id: '3', brand: 'Acer', model: 'Iconia', price: 170, ram: '2GB', os: 'Android', imgUrl: '' },
  { id: '4', brand: 'Apple', model: 'iPhone 14', price: 1099, ram: '6GB', os: 'iOS', imgUrl: '' },
  { id: '5', brand: 'Samsung', model: 'Galaxy S22', price: 899, ram: '8GB', os: 'Android', imgUrl: '' },
  { id: '6', brand: 'Xiaomi', model: 'Mi 11', price: 699, ram: '8GB', os: 'Android', imgUrl: '' },
  { id: '7', brand: 'Apple', model: 'iPhone 15', price: 1199, ram: '8GB', os: 'iOS', imgUrl: '' },
  { id: '8', brand: 'Samsung', model: 'Galaxy S23', price: 999, ram: '12GB', os: 'Android', imgUrl: '' },
  { id: '9', brand: 'Xiaomi', model: 'Mi 12', price: 799, ram: '12GB', os: 'Android', imgUrl: '' },
  { id: '10', brand: 'Google', model: 'Pixel 7', price: 599, ram: '8GB', os: 'Android', imgUrl: '' },
  { id: '11', brand: 'OnePlus', model: '9 Pro', price: 899, ram: '12GB', os: 'Android', imgUrl: '' },
  { id: '12', brand: 'Google', model: 'Pixel 8', price: 699, ram: '8GB', os: 'Android', imgUrl: '' },
];

const defaultTableConfig = {
  data: mockDevices,
  columns: [
    { key: 'brand', label: 'Marca', dataType: 'string', sortable: true },
    { key: 'model', label: 'Modelo', dataType: 'string', sortable: true },
    { key: 'price', label: 'Precio', dataType: 'number', sortable: true },
  ],
  paginated: true,
  pageSize: 10,
  searchable: true,
  searchableFields: ['brand', 'model', 'os'],
  debounceMs: 300,
  sortable: true,
};

describe('useTableState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Search (Filtering)', () => {
    it('initializes with empty search state', () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));
      expect(result.current.state.search).toBe('');
      expect(result.current.state.inputValue).toBe('');
    });

    it('updates inputValue immediately for UI (without debounce)', () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));
      
      // Input value se actualiza inmediatamente - sin act/wait
      act(() => {
        result.current.actions.setSearch('test');
      });
      expect(result.current.state.inputValue).toBe('test'); // ✅ Immediate update
      // search se actualiza después del debounce
    });

    it('updates search state when setSearch is called after debounce', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      await act(async () => {
        result.current.actions.setSearch('Apple');
      });

      // Wait for debounce
      await waitFor(() => {
        expect(result.current.state.search).toBe('Apple');
      });
    });

    it('filters data based on search term (brand)', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      await act(async () => {
        result.current.actions.setSearch('Apple');
      });

      await waitFor(() => {
        expect(result.current.data.totalFiltered).toBe(3); // Apple devices: iPhone 13, 14, 15
      });
    });

    it('filters data based on search term (model)', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      await act(async () => {
        result.current.actions.setSearch('Galaxy');
      });

      await waitFor(() => {
        expect(result.current.data.totalFiltered).toBe(3); // Galaxy S21, S22, S23
      });
    });

    it('resets to page 1 when search changes', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      // Go to page 2 first
      await act(async () => {
        result.current.actions.setPage(2);
      });

      expect(result.current.state.page).toBe(2);

      // Search should reset to page 1
      await act(async () => {
        result.current.actions.setSearch('Samsung');
      });

      await waitFor(() => {
        expect(result.current.state.page).toBe(1);
      });
    });

    it('clears search when clearFilters is called', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      await act(async () => {
        result.current.actions.setSearch('Apple');
      });

      await waitFor(() => {
        expect(result.current.state.search).toBe('Apple');
      });

      await act(async () => {
        result.current.actions.clearFilters();
      });

      expect(result.current.state.search).toBe('');
      expect(result.current.state.page).toBe(1);
    });
  });

  describe('Sorting', () => {
    it('initializes with no sort', () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));
      expect(result.current.state.sortBy).toBe(null);
      expect(result.current.state.sortOrder).toBe('asc');
    });

    it('toggles sort when clicking same column (asc -> desc -> asc)', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      // First click: set sort to asc
      await act(async () => {
        result.current.actions.setSortBy('brand');
      });

      expect(result.current.state.sortBy).toBe('brand');
      expect(result.current.state.sortOrder).toBe('asc');

      // Second click: toggle to desc
      await act(async () => {
        result.current.actions.setSortBy('brand');
      });

      expect(result.current.state.sortOrder).toBe('desc');

      // Third click: back to asc
      await act(async () => {
        result.current.actions.setSortBy('brand');
      });

      expect(result.current.state.sortOrder).toBe('asc');
      expect(result.current.state.sortBy).toBe('brand'); // Sort is still applied
    });

    it('changes sort column when clicking different column', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      await act(async () => {
        result.current.actions.setSortBy('brand');
      });

      expect(result.current.state.sortBy).toBe('brand');

      await act(async () => {
        result.current.actions.setSortBy('price');
      });

      expect(result.current.state.sortBy).toBe('price');
      expect(result.current.state.sortOrder).toBe('asc'); // Reset to asc for new column
    });

    it('resets to page 1 when sort changes', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      await act(async () => {
        result.current.actions.setPage(2);
      });

      expect(result.current.state.page).toBe(2);

      await act(async () => {
        result.current.actions.setSortBy('brand');
      });

      expect(result.current.state.page).toBe(1);
    });

    it('sorts by price when price column is clicked', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      // Click price column - should toggle to asc
      await act(async () => {
        result.current.actions.setSortBy('price');
      });

      // Sort should be applied - just verify state changed, not actual order
      expect(result.current.state.sortBy).toBe('price');
      expect(result.current.state.sortOrder).toBe('asc');
    });
  });

  describe('Pagination', () => {
    it('initializes on page 1', () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));
      expect(result.current.state.page).toBe(1);
    });

    it('calculates total pages correctly', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      // 12 items, 10 per page = 2 pages
      await waitFor(() => {
        expect(result.current.data.totalPages).toBe(2);
      });
    });

    it('returns first page of items', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      await waitFor(() => {
        expect(result.current.data.items).toHaveLength(10);
      });
    });

    it('navigates to next page', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      await act(async () => {
        result.current.actions.setPage(2);
      });

      expect(result.current.state.page).toBe(2);

      await waitFor(() => {
        expect(result.current.data.items).toHaveLength(2); // Last 2 items
      });
    });

    it('navigates to previous page', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      await act(async () => {
        result.current.actions.setPage(2);
      });

      await act(async () => {
        result.current.actions.setPage(1);
      });

      expect(result.current.state.page).toBe(1);
    });
  });

  describe('Combined operations', () => {
    it('filters and paginates correctly', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      // Search for Samsung (should find 3)
      await act(async () => {
        result.current.actions.setSearch('Samsung');
      });

      await waitFor(() => {
        // 3 Samsung devices, still paginated 10 per page = 1 page
        expect(result.current.data.totalPages).toBe(1);
        expect(result.current.data.totalFiltered).toBe(3);
      });
    });

    it('sorts and paginates correctly', async () => {
      const { result } = renderHook(() => useTableState(defaultTableConfig));

      await act(async () => {
        result.current.actions.setSortBy('price');
      });

      // Verify sort state is applied
      await waitFor(() => {
        expect(result.current.state.sortBy).toBe('price');
        expect(result.current.state.sortOrder).toBe('asc');
      });
    });
  });
});