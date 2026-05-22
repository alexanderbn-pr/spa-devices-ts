import { useMutation } from '@tanstack/react-query';
import { fetchAddDeviceCart } from '../services/postAddDeviceCart';
import { useCartContext } from './useCartContext';

export const useCart = () => {
  const { cartItemsCount, setCartItemsCount } = useCartContext();

  const {
    mutate: addToCart,
    isLoading: isLoadingAddingCart,
    isError: isErrorAddingCart,
  } = useMutation({
    mutationFn: fetchAddDeviceCart,
    onSuccess: (count) => {
      setCartItemsCount((prev) => {
        return prev + count;
      });
    },
  });

  return {
    cartItemsCount,
    addToCart,
    isLoadingAddingCart,
    isErrorAddingCart,
  };
};
