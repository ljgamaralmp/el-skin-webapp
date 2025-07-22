import { createContext, useState, useContext, ReactNode } from 'react';
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

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product) => {
    // Verifica se o item já existe no carrinho
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // Se existe, apenas incrementa a quantidade
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Se não existe, adiciona o novo item com quantidade 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    // Filtra o array, removendo o item com o ID correspondente
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    // Se a quantidade for 0 ou menos, remove o item
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    // Caso contrário, atualiza a quantidade do item específico
    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: quantity }
        : item
    ));
  };
  
  // Calcula o valor total do carrinho
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      openCart,
      closeCart,
      cartTotal,
    }}>
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