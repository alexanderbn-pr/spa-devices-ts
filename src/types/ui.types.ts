export type Language = 'es' | 'en';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SearchFilters {
  searchName: string;
  setSearchName: (value: string) => void;
  debouncedFilterName: string;
}

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}
