import '@testing-library/jest-dom';
import { screen, fireEvent, render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { CartItem } from '../../../types/types';

import searchReducer from '../../../store/slices/searchSlice';
import cartReducer, { openCart } from '../../../store/slices/cartSlice';
import productsReducer from '../../../store/slices/productSlice';

import Topo from './index';

const rootReducer = combineReducers({
  search: searchReducer,
  cart: cartReducer,
  products: productsReducer,
});

const renderWithProviders = (
  ui: React.ReactElement,
  { preloadedState }: { preloadedState?: Partial<RootState> } = {}
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper }) };
};

jest.mock('../../Pesquisa', () => {
  return function MockPesquisa() {
    return <input data-testid="mock-pesquisa" placeholder="Pesquisa" />;
  };
});

describe('Componente Topo', () => {
  test('deve renderizar o título, o componente de pesquisa e o botão do carrinho', () => {
    renderWithProviders(<Topo />);

    expect(screen.getByText('AL SKIN')).toBeInTheDocument();
    expect(screen.getByTestId('mock-pesquisa')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ícone de sacola/i })).toBeInTheDocument();
  });

  test('não deve exibir a contagem de itens quando o carrinho está vazio', () => {
    renderWithProviders(<Topo />);

    expect(screen.queryByText(/\d+/)).toBeNull();
  });

  test('deve exibir a contagem correta de itens quando o carrinho tem produtos', () => {
    const mockItems: CartItem[] = [
      { id: 1, quantity: 2, name: 'Prod A', price: 10, image: '', description: '', tags: [] },
      { id: 2, quantity: 3, name: 'Prod B', price: 20, image: '', description: '', tags: [] },
    ];
    
    const preloadedState: Partial<RootState> = {
      cart: {
        cartItems: mockItems,
        isCartOpen: false,
      },
    };

    renderWithProviders(<Topo />, { preloadedState });

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('deve despachar a ação openCart quando o botão do carrinho for clicado', () => {
    const { store } = renderWithProviders(<Topo />);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const cartButton = screen.getByRole('button', { name: /ícone de sacola/i });
    fireEvent.click(cartButton);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(openCart());
  });
});