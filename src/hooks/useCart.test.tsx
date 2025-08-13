import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore} from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { useCart } from './useCart';
import { Produto as Product } from '../types/types';
import { RootState } from '../store';

import searchReducer from '../store/slices/searchSlice';
import cartReducer from '../store/slices/cartSlice';
import productsReducer from '../store/slices/productSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  cart: cartReducer,
  products: productsReducer,
});

const renderUseCartHook = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return renderHook(() => useCart(), { wrapper });
};

const mockProduct1: Product = {
  id: 1,
  name: 'Produto Teste 1',
  description: 'Desc',
  price: 100,
  image: 'img1.jpg',
  tags: []
};

const mockProduct2: Product = {
  id: 2,
  name: 'Produto Teste 2',
  description: 'Desc 2',
  price: 50,
  image: 'img2.jpg',
  tags: []
};

describe('Hook: useCart', () => {

  test('deve iniciar com o carrinho vazio e o modal fechado', () => {
    const { result } = renderUseCartHook();

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.isCartOpen).toBe(false);
    expect(result.current.cartTotal).toBe(0);
  });

  test('deve adicionar um novo produto ao carrinho', () => {
    const { result } = renderUseCartHook();

    act(() => {
      result.current.addToCart(mockProduct1);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].name).toBe('Produto Teste 1');
    expect(result.current.cartItems[0].quantity).toBe(1);
    expect(result.current.cartTotal).toBe(100);
  });

  test('deve incrementar a quantidade de um produto existente', () => {
    const initialState: Partial<RootState> = {
      cart: {
        cartItems: [{ ...mockProduct1, quantity: 1 }],
        isCartOpen: false,
      }
    };
    const { result } = renderUseCartHook(initialState);

    act(() => {
      result.current.addToCart(mockProduct1);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
    expect(result.current.cartTotal).toBe(200);
  });

  test('deve remover um produto do carrinho', () => {
    const initialState: Partial<RootState> = {
      cart: {
        cartItems: [
          { ...mockProduct1, quantity: 1 },
          { ...mockProduct2, quantity: 1 }
        ],
        isCartOpen: false
      }
    };
    const { result } = renderUseCartHook(initialState);

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].id).toBe(2);
    expect(result.current.cartTotal).toBe(50);
  });

  test('deve atualizar a quantidade de um produto', () => {
    const initialState: Partial<RootState> = {
      cart: {
        cartItems: [{ ...mockProduct1, quantity: 1 }],
        isCartOpen: false
      }
    };
    const { result } = renderUseCartHook(initialState);

    act(() => {
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
    expect(result.current.cartTotal).toBe(500);
  });
  
  test('deve remover o item se a quantidade for atualizada para 0 ou menos', () => {
    const initialState: Partial<RootState> = {
      cart: {
        cartItems: [{ ...mockProduct1, quantity: 3 }],
        isCartOpen: false
      }
    };
    const { result } = renderUseCartHook(initialState);

    act(() => {
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.cartTotal).toBe(0);
  });

  test('deve abrir e fechar o modal do carrinho', () => {
    const { result } = renderUseCartHook();

    expect(result.current.isCartOpen).toBe(false);

    act(() => {
      result.current.openCart();
    });
    expect(result.current.isCartOpen).toBe(true);

    act(() => {
      result.current.closeCart();
    });
    expect(result.current.isCartOpen).toBe(false);
  });
});