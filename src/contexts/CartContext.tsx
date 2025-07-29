import React, { createContext, useContext, ReactNode } from 'react';
import { useCart, UseCartReturn } from '../hooks/useCart'; // Importa o hook e o tipo

// --- Criação do Contexto ---
type CartContextType = UseCartReturn;

const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Componente Provedor ---
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // O provider usa o hook para obter os valores
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

// --- Hook para Consumir o Contexto ---
export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext deve ser usado dentro de um CartProvider');
  }
  return context;
};