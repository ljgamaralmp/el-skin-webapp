import '@testing-library/jest-dom';
import { screen, fireEvent, render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { RootState } from '../../store'; 
import { CartItem } from '../../types/types'; 

import searchReducer from '../../store/slices/searchSlice';

import cartReducer, { closeCart, removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import productsReducer from '../../store/slices/productSlice';

import { CartModal } from './index';


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


const mockCartItems: CartItem[] = [
  { id: 1, name: 'Produto 1', price: 100, quantity: 2, image: 'img1.jpg', description: '', tags: [] },
  { id: 2, name: 'Produto 2', price: 50, quantity: 1, image: 'img2.jpg', description: '', tags: [] },
];

describe('Componente CartModal', () => {

  test('não deve renderizar o modal quando isCartOpen for false', () => {
    // Organizar: o estado padrão do slice já tem isCartOpen: false
    const { container } = renderWithProviders(<CartModal />);

    // Afirmar
    expect(container.firstChild).toBeNull();
  });

  test('deve renderizar a mensagem de carrinho vazio quando não houver itens', () => {
    // Organizar: Inicia o store com o modal aberto e carrinho vazio
    renderWithProviders(<CartModal />, {
      preloadedState: {
        cart: {
          cartItems: [],
          isCartOpen: true,
        },
      },
    });

    // Afirmar
    expect(screen.getByText('Seu carrinho está vazio.')).toBeInTheDocument();
  });

  test('deve renderizar os itens do carrinho corretamente', () => {
    // Organizar: Inicia o store com o modal aberto e itens no carrinho
    renderWithProviders(<CartModal />, {
      preloadedState: {
        cart: {
          cartItems: mockCartItems,
          isCartOpen: true,
        },
      },
    });

    // Afirmar
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText(/Total: R\$\s*250,00/i)).toBeInTheDocument();
  });

  test('deve despachar a ação closeCart ao clicar no botão de fechar', () => {
    // Organizar
    const { store } = renderWithProviders(<CartModal />, {
      preloadedState: { cart: { cartItems: [], isCartOpen: true } },
    });
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Atuar
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    
    // Afirmar
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(closeCart());
  });

  test('deve despachar as ações de update e remove ao interagir com os itens', () => {
    // Organizar
    const { store } = renderWithProviders(<CartModal />, {
      preloadedState: {
        cart: {
          cartItems: mockCartItems,
          isCartOpen: true,
        },
      },
    });
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Atuar: Clica para diminuir a quantidade do primeiro item
    const minusButtons = screen.getAllByTestId('minus-button');
    fireEvent.click(minusButtons[0]);

    // Afirmar
    expect(dispatchSpy).toHaveBeenCalledWith(updateQuantity({ productId: 1, quantity: 1 }));

    // Atuar: Clica para aumentar a quantidade do primeiro item
    const plusButtons = screen.getAllByTestId('plus-button');
    fireEvent.click(plusButtons[0]); 

    // Afirmar
    expect(dispatchSpy).toHaveBeenCalledWith(updateQuantity({ productId: 1, quantity: 3 }));

    // Atuar: Clica para remover o segundo item
    const removeButtons = screen.getAllByTestId('remove-button');
    fireEvent.click(removeButtons[1]);

    // Afirmar
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromCart(2));
  });
});