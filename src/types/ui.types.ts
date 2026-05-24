export type Language = 'es' | 'en';

export type BreadcrumbItem = {
  label: string;
  href?: string;
}

export type SearchFilters = {
  searchName: string;
  setSearchName: (value: string) => void;
  debouncedFilterName: string;
}

export type EmptyStateAction = {
  label: string;
  onClick: () => void;
}
