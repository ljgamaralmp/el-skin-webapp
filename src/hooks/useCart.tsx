import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Produto as Product, CartItem } from '../types/types';
import { AppDispatch } from '../store';

import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  openCart as openCartAction,
  closeCart as closeCartAction,
  selectCartItems,
  selectIsCartOpen,
  selectCartTotal,
} from '../store/slices/cartSlice';


export interface UseCartReturn {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartTotal: number;
}

export const useCart = (): UseCartReturn => {

  const dispatch: AppDispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartTotal = useSelector(selectCartTotal);

  //    'useCallback' garante que a referência da função não mude a cada renderização
  const addToCart = useCallback((product: Product) => {
    dispatch(addToCartAction(product));
  }, [dispatch]);

  const removeFromCart = useCallback((productId: number) => {
    dispatch(removeFromCartAction(productId));
  }, [dispatch]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch(updateQuantityAction({ productId, quantity }));
  }, [dispatch]);

  const openCart = useCallback(() => {
    dispatch(openCartAction());
  }, [dispatch]);

  const closeCart = useCallback(() => {
    dispatch(closeCartAction());
  }, [dispatch]);

// interface do hook, agora alimentada pelo Redux
  return {
    cartItems,
    isCartOpen,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    openCart,
    closeCart,
  };
};