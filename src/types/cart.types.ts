import type { Dispatch, SetStateAction } from 'react';

export interface CartContextValue {
  cartItemsCount: number;
  setCartItemsCount: Dispatch<SetStateAction<number>>;
}

export type AddToCartPayload = {
  id: string;
  colorCode: string;
  storageCode: string;
}
