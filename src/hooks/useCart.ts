import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAddDeviceCart } from '../services/postAddDeviceCart';
import { useCartContext } from './useCartContext';
import { queryKeys } from '../lib/query-keys';
import { useToast } from './useToast';
import { useTranslation } from 'react-i18next';
import type { AddToCartPayload } from '../types/cart.types';

/**
 * Hook for adding a device to the cart
 */
export const useCart = () => {
  const { cartItemsCount, setCartItemsCount } = useCartContext();
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: addToCart,
    isPending: isLoadingAddingCart,
    isError: isErrorAddingCart,
  } = useMutation({
    mutationFn: (payload: AddToCartPayload) => fetchAddDeviceCart(payload),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.count() });

      const previousCount = cartItemsCount;

      setCartItemsCount((prev) => prev + 1);

      return { previousCount };
    },
    onSuccess: () => {
      toast.success(t('cart.added'));
    },
    onError: (_, __, context) => {
      if (context?.previousCount !== undefined) {
        setCartItemsCount(context.previousCount);
      }
      toast.error(t('cart.error'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.count() });
    },
  });

  return {
    cartItemsCount,
    addToCart,
    isLoadingAddingCart,
    isErrorAddingCart,
  };
};
