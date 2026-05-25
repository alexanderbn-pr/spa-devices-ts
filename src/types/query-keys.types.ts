export type QueryKeys = {
  devices: {
    all: readonly ['devices'];
    lists: () => readonly ['devices', 'list'];
    list: (search: string) => readonly ['devices', 'list', { search: string }];
    details: () => readonly ['devices', 'detail'];
    detail: (id: string) => readonly ['devices', 'detail', string];
  };
  cart: {
    all: readonly ['cart'];
    count: () => readonly ['cart', 'count'];
  };
}
