/**
 * Generic table: pure helper functions for filtering, sorting and pagination
 * Follows react-table skill patterns
 */

/**
 * Filters data by search term across specific fields
 * @param {T[]} data - data to filter
 * @param {string} search - search term
 * @param {(keyof T)[]} searchFields - fields to search in
 * @param {Record<string, any>} [additionalFilters] - additional filter criteria
 * @returns {T[]} filtered data
 */
export function filterData(data, search, searchFields, additionalFilters) {
  return data.filter((item) => {
    // Search filtering
    if (search.trim()) {
      const matchesSearch = searchFields.some((field) =>
        String(item[field] ?? '')
          .toLowerCase()
          .includes(search.toLowerCase())
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
 * @param {T[]} data - data to sort
 * @param {keyof T} sortBy - field to sort by
 * @param {'asc' | 'desc'} order - sort order asc/desc
 * @param {'string' | 'number' | 'date' | 'boolean' | 'custom'} dataType - field data type
 * @param {Function} [sortFn] - custom sort function
 * @returns {T[]} sorted data
 */
export function sortData(data, sortBy, order, dataType, sortFn) {
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
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
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
 * @param {T[]} data - data to paginate
 * @param {number} page - current page (1-indexed)
 * @param {number} pageSize - items per page
 * @returns {{ items: T[], totalPages: number }} page items and total pages
 */
export function paginateData(data, page, pageSize) {
  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize;
  const items = data.slice(start, start + pageSize);
  return { items, totalPages };
}