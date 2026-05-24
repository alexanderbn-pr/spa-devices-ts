/**
 * Generic table: pure helper functions for filtering, sorting and pagination
 * Follows react-table skill patterns
 */

/**
 * Filters data by search term across specific fields
 */
export function filterData<T extends Record<string, unknown>>(
  data: T[],
  search: string,
  searchFields: (keyof T)[],
  additionalFilters?: Record<string, unknown>,
): T[] {
  return data.filter((item) => {
    // Search filtering
    if (search.trim()) {
      const matchesSearch = searchFields.some((field) =>
        String(item[field] ?? '')
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
      if (!matchesSearch) return false;
    }

    // Additional filters
    if (additionalFilters) {
      for (const [key, value] of Object.entries(additionalFilters)) {
        if (value === null || value === undefined) continue;
        if (item[key] !== value) return false;
      }
    }

    return true;
  });
}

/**
 * Sorts data by field and order
 */
export function sortData<T extends Record<string, unknown>>(
  data: T[],
  sortBy: keyof T,
  order: 'asc' | 'desc',
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'custom',
  sortFn?: (a: T, b: T) => number,
): T[] {
  return [...data].sort((a, b) => {
    if (sortFn) {
      return order === 'asc' ? sortFn(a, b) : sortFn(b, a);
    }

    const valueA = a[sortBy];
    const valueB = b[sortBy];

    // Handle null/undefined
    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return 1;
    if (valueB == null) return -1;

    // Type-based sorting
    switch (dataType) {
      case 'number': {
        return order === 'asc'
          ? (Number(valueA) || 0) - (Number(valueB) || 0)
          : (Number(valueB) || 0) - (Number(valueA) || 0);
      }
      case 'date': {
        const dateA = new Date(valueA as string | number).getTime();
        const dateB = new Date(valueB as string | number).getTime();
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }
      case 'boolean': {
        return order === 'asc'
          ? (valueA ? 1 : 0) - (valueB ? 1 : 0)
          : (valueB ? 1 : 0) - (valueA ? 1 : 0);
      }
      case 'string':
      default: {
        return order === 'asc'
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      }
    }
  });
}

/**
 * Paginates data
 */
export function paginateData<T extends Record<string, unknown>>(
  data: T[],
  page: number,
  pageSize: number,
): { items: T[]; totalPages: number } {
  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize;
  const items = data.slice(start, start + pageSize);
  return { items, totalPages };
}
