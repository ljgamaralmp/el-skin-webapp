import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Topo from './index';
import { useCart } from '../../../contexts/CartContext';

// Organizar
jest.mock('../../Pesquisa', () => {
  return function MockPesquisa() {
    return <input data-testid="mock-pesquisa" placeholder="Pesquisa" />;
  };
});

jest.mock('../../../contexts/CartContext');
const useCartMock = useCart as jest.Mock;

describe('Componente Topo', () => {
  // Limpa os mocks entre os testes
  beforeEach(() => {
    useCartMock.mockClear();
  });

  test('deve renderizar o título, o componente de pesquisa e o botão do carrinho', () => {
    useCartMock.mockReturnValue({
      cartItems: [],
      openCart: jest.fn(),
    });

    // Atuar
    render(<Topo />);

    // Afirmar
    expect(screen.getByText('AL SKIN')).toBeInTheDocument();
    expect(screen.getByTestId('mock-pesquisa')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ícone de sacola/i })).toBeInTheDocument();
  });

  //Organizar
  test('não deve exibir a contagem de itens quando o carrinho está vazio', () => {
    useCartMock.mockReturnValue({
      cartItems: [],
      openCart: jest.fn(),
    });

    // Atuar
    render(<Topo />);

    // Afirmar
    // queryByText retorna null se não encontrar, o que é o esperado
    expect(screen.queryByText(/\d+/)).toBeNull();
  });

  test('deve exibir a contagem correta de itens quando o carrinho tem produtos', () => {
    // Organizar
    useCartMock.mockReturnValue({
      cartItems: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
      ],
      openCart: jest.fn(),
    });

    // Atuar
    render(<Topo />);

    // Afirmar
    // A contagem total é 2 + 3 = 5
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('deve chamar a função openCart quando o botão do carrinho for clicado', () => {
    // Organizar
    const mockOpenCart = jest.fn();
    useCartMock.mockReturnValue({
      cartItems: [],
      openCart: mockOpenCart,
    });

    // Atuar
    render(<Topo />);
    const cartButton = screen.getByRole('button'); // Só há um botão neste componente
    fireEvent.click(cartButton);

    // Afirmar
    expect(mockOpenCart).toHaveBeenCalledTimes(1);
  });
});