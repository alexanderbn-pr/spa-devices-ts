import type { ReactNode } from 'react';

export interface Column<T extends Record<string, unknown>> {
  key: keyof T;
  label: string;
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'custom';
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  className?: string;
  render?: (row: T) => ReactNode;
  sortFn?: (a: T, b: T) => number;
}

export interface TableConfig<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  paginated?: boolean;
  pageSize?: number;
  searchable?: boolean;
  searchableFields?: (keyof T)[];
  debounceMs?: number;
  sortable?: boolean;
  striped?: boolean;
  hover?: boolean;
  rowClickable?: boolean;
  onRowClick?: (row: T) => void;
}

export interface TableState<T extends Record<string, unknown>> {
  search: string;
  inputValue: string;
  filters: Record<string, unknown>;
  sortBy: keyof T | null;
  sortOrder: 'asc' | 'desc';
  page: number;
  selectedRows: Set<number>;
}
