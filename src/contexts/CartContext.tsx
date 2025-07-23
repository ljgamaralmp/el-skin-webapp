import { createContext, useState, useContext, ReactNode, useReducer, useMemo } from 'react';
import {Produto as Product} from '../types/types';



export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartTotal: number;
}

export const ADD_PRODUTO = "ADD_PRODUTO";
export const REMOVE_PRODUTO = "REMOVE_PRODUTO";
export const UPDATE_quantity = "UPDATE_quantity";
type ActionType = 
  | { type: typeof ADD_PRODUTO; payload: Product }
  | { type: typeof REMOVE_PRODUTO; payload: number }
  | { type: typeof UPDATE_quantity; payload: { productId: number; quantity: number } };

  export const carrinhoReducer = (state: CartItem[], action: ActionType): CartItem[] => {
  switch (action.type) {
    case ADD_PRODUTO:
      const novoProduto = action.payload;
      const produtoIndex = state.findIndex((item) => item.id === novoProduto.id);
      
      if (produtoIndex === -1) {
        // Adiciona o novo produto com quantity 1 caso ele ainda não exista no carrinho
        return [...state, { ...novoProduto, quantity: 1 }];
      } else {
        // Atualiza a quantity do produto caso ele já exista no carrinho
        return state.map((item, index) =>
          index === produtoIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

    case REMOVE_PRODUTO:
      const productId = action.payload;
      return state.filter((item) => item.id !== productId);

    case UPDATE_quantity:
      const { productId: id, quantity } = action.payload;
      // Impede que a quantity seja menor que 1, removendo o item em vez disso.
      if (quantity <= 0) {
        return state.filter(item => item.id !== id);
      }
      return state.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {

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
    dispatch({ type: UPDATE_quantity, payload: { productId, quantity } });
  };
  
  // Calcula o valor total do carrinho
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const contextValue = useMemo(() => ({
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    openCart,
    closeCart,
    cartTotal,
  }), [cartItems, isCartOpen, cartTotal]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// hook Customizado
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}