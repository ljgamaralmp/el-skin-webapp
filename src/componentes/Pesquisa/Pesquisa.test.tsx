import '@testing-library/jest-dom';
import { screen, fireEvent, render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { RootState } from '../../store';

//todos os reducers e as ações necessárias para o teste
import searchReducer, { setSearch } from '../../store/slices/searchSlice';
import cartReducer from '../../store/slices/cartSlice';
import productsReducer from '../../store/slices/productSlice';

import Pesquisa from './index';

// Função auxiliar de renderização com o Provider do Redux
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


jest.mock('../Input', () => {
  return function MockInput({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return <input data-testid="mock-input" value={value} onChange={onChange} />;
  };
});

describe('Componente Pesquisa', () => {

  test('deve renderizar o valor inicial do termo de busca vindo do Redux', () => {
    // Organizar
    const preloadedState: Partial<RootState> = {
      search: { search: 'Valor Inicial' }
    };

    // Atuar
    renderWithProviders(<Pesquisa />, { preloadedState });

    // Afirmar: Verifica se o input mockado recebeu o valor do store
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveValue('Valor Inicial');
  });

  test('deve despachar a ação setSearch quando o usuário digita no input', () => {
   
    const { store } = renderWithProviders(<Pesquisa />);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Atuar
    const input = screen.getByTestId('mock-input');
    // Simula o usuário digitando a palavra 'creme'
    fireEvent.change(input, { target: { value: 'creme' } });

    // Afirmar: Verifica se a ação correta foi despachada com o payload correto
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(setSearch('creme'));
  });

  test('deve renderizar o ícone de lupa', () => {
    // Atuar
    renderWithProviders(<Pesquisa />);

    // Afirmar
    const lupaIcon = screen.getByAltText('Ícone de Lupa');
    expect(lupaIcon).toBeInTheDocument();
  });
});