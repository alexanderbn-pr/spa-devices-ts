import type { QueryKeys } from '../types/query-keys.types';

export const queryKeys = {
  devices: {
    all: ['devices'] as const,
    lists: () => ['devices', 'list'] as const,
    list: (search: string) => ['devices', 'list', { search }] as const,
    details: () => ['devices', 'detail'] as const,
    detail: (id: string) => ['devices', 'detail', id] as const,
  },
  cart: {
    all: ['cart'] as const,
    count: () => ['cart', 'count'] as const,
  },
} satisfies QueryKeys;
