import { useState, useReducer, useMemo } from 'react';
import { Produto as Product } from '../types/types';


export interface CartItem extends Product {
  quantity: number;
}

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

// --- Definições do Reducer ---
const ADD_PRODUTO = "ADD_PRODUTO";
const REMOVE_PRODUTO = "REMOVE_PRODUTO";
const UPDATE_QUANTITY = "UPDATE_QUANTITY"; // Renomeado para seguir o padrão

type ActionType =
  | { type: typeof ADD_PRODUTO; payload: Product }
  | { type: typeof REMOVE_PRODUTO; payload: number }
  | { type: typeof UPDATE_QUANTITY; payload: { productId: number; quantity: number } };

const carrinhoReducer = (state: CartItem[], action: ActionType): CartItem[] => {
  switch (action.type) {
    case ADD_PRODUTO: {
      const novoProduto = action.payload;
      const produtoIndex = state.findIndex((item) => item.id === novoProduto.id);

      if (produtoIndex === -1) {
        return [...state, { ...novoProduto, quantity: 1 }];
      }

      return state.map((item, index) =>
        index === produtoIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case REMOVE_PRODUTO: {
      const productId = action.payload;
      return state.filter((item) => item.id !== productId);
    }

    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(item => item.id !== productId);
      }
      return state.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    }

    default:
      return state;
  }
};

// --- O Hook Customizado com a Lógica ---
export const useCart = (): UseCartReturn => {
  const [cartItems, dispatch] = useReducer(carrinhoReducer, []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product) => {
    dispatch({ type: ADD_PRODUTO, payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: REMOVE_PRODUTO, payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { productId, quantity } });
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  // useMemo para evitar recriações desnecessárias do objeto de contexto
  const value = useMemo(() => ({
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    openCart,
    closeCart,
    cartTotal,
  }), [cartItems, isCartOpen, cartTotal]);

  return value;
};