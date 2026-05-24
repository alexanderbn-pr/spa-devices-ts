import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

/**
 * Hook for search state
 * Manages state + debounce — used outside Suspense
 */
export const useDevicesSearch = () => {
  const [searchName, setSearchName] = useState('');
  const debouncedFilterName = useDebounce(searchName, 250);

  return {
    searchName,
    setSearchName,
    debouncedFilterName,
  };
};
