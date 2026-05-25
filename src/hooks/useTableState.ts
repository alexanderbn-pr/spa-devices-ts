import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { filterData, sortData, paginateData } from '../utils/table-helpers';
import type { TableConfig, TableState, Column } from '../types/table.types';

type TableActions = {
  setSearch: (value: string) => void;
  setFilter: (key: string, value: unknown) => void;
  clearFilters: () => void;
  setSortBy: (key: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setPage: (page: number) => void;
  toggleRowSelection: (index: number) => void;
}

type ProcessedData<T extends Record<string, unknown>> = {
  items: T[];
  totalPages: number;
  totalFiltered: number;
}

export function useTableState<T extends Record<string, unknown>>(
  config: TableConfig<T>,
): { state: TableState<T>; actions: TableActions; data: ProcessedData<T> } {
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback(
    (value: string) => {
      setInputValue(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      const delay = config.debounceMs ?? 300;
      debounceRef.current = setTimeout(() => {
        setSearch(value);
        setPage(1);
      }, delay);
    },
    [config.debounceMs],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const setFilter = useCallback((key: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearch('');
    setInputValue('');
    setPage(1);
  }, []);

  const toggleSort = useCallback(
    (key: keyof T) => {
      if (sortBy === key) {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(key);
        setSortOrder('asc');
      }
      setPage(1);
    },
    [sortBy],
  );

  const toggleRowSelection = useCallback((index: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const processedData = useMemo(() => {
    const searchFields = config.searchableFields ||
      config.columns.map((c: Column<T>) => c.key);

    let filtered = config.searchable
      ? filterData(config.data, search, searchFields, filters)
      : config.data;

    if (config.sortable && sortBy) {
      const column = config.columns.find((c: Column<T>) => c.key === sortBy);
      filtered = sortData(
        filtered,
        sortBy,
        sortOrder,
        column?.dataType ?? 'string',
        column?.sortFn,
      );
    }

    const pageSize = config.pageSize ?? 10;
    const { items, totalPages } = config.paginated
      ? paginateData(filtered, page, pageSize)
      : { items: filtered, totalPages: 1 };

    return {
      items,
      totalPages,
      totalFiltered: filtered.length,
    };
  }, [
    config.data,
    config.columns,
    config.searchable,
    config.sortable,
    config.paginated,
    config.pageSize,
    config.searchableFields,
    search,
    filters,
    sortBy,
    sortOrder,
    page,
  ]);

  return {
    state: {
      search,
      inputValue,
      filters,
      sortBy,
      sortOrder,
      page,
      selectedRows,
    },
    actions: {
      setSearch: handleSearchChange,
      setFilter,
      clearFilters,
      setSortBy: toggleSort as (key: string) => void,
      setSortOrder,
      setPage,
      toggleRowSelection,
    },
    data: processedData,
  };
}
