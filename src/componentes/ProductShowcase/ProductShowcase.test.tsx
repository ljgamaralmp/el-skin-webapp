import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Produto } from '../../types/types';

import searchReducer from '../../store/slices/searchSlice';
import cartReducer, { addToCart } from '../../store/slices/cartSlice';
import productsReducer from '../../store/slices/productSlice';

import ProductShowcase from './index';

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

const mockProducts: Produto[] = [
  {
    id: 1,
    name: 'Produto 1',
    description: 'Descrição do produto 1',
    price: 99.99,
    image: '/image1.jpg',
    tags: [{ label: 'Proteção', type: 'protection' as const }]
  },
  {
    id: 2,
    name: 'Produto 2',
    description: 'Descrição do produto 2',
    price: 149.99,
    image: '/image2.jpg',
    tags: [{ label: 'Rosto', type: 'face' as const }]
  }
];

describe('Componente ProductShowcase', () => {

  test('deve exibir produtos corretamente quando eles estão no estado do Redux', () => {
    const preloadedState: Partial<RootState> = {
      products: {
        products: mockProducts,
        loading: 'succeeded',
        error: null,
        currentProduct: null,
        currentProductLoading: 'idle',
      }
    };

    renderWithProviders(<ProductShowcase />, { preloadedState });
    
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Descrição do produto 1')).toBeInTheDocument();
    expect(screen.getByText(/99,99/)).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText('Descrição do produto 2')).toBeInTheDocument();
    expect(screen.getByText(/149,99/)).toBeInTheDocument();
  });

  test('Deve chamar console.log ao clicar no produto', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const preloadedState: Partial<RootState> = {
      products: { products: mockProducts, loading: 'succeeded', error: null, currentProduct: null, currentProductLoading: 'idle' }
    };
    renderWithProviders(<ProductShowcase />, { preloadedState });

    const productCard = screen.getByText('Produto 1');
    fireEvent.click(productCard);
    
    expect(consoleSpy).toHaveBeenCalledWith('Produto clicado: 1');
    consoleSpy.mockRestore();
  });

  test('Deve despachar a ação addToCart ao clicar no botão comprar', () => {
    const preloadedState: Partial<RootState> = {
      products: { products: mockProducts, loading: 'succeeded', error: null, currentProduct: null, currentProductLoading: 'idle' }
    };
    const { store } = renderWithProviders(<ProductShowcase />, { preloadedState });
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    
    const buyButtons = screen.getAllByRole('button', { name: /comprar/i });
    fireEvent.click(buyButtons[0]);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(addToCart(mockProducts[0]));
  });

  test('Deve filtrar produtos com base no termo de busca do estado Redux', () => {
    const preloadedState: Partial<RootState> = {
      products: { products: mockProducts, loading: 'succeeded', error: null, currentProduct: null, currentProductLoading: 'idle' },
      search: { search: 'Produto 1' }
    };
    
    renderWithProviders(<ProductShowcase />, { preloadedState });
    
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.queryByText('Produto 2')).not.toBeInTheDocument();
  });
});