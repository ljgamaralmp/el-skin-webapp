import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartModal } from './index';
import { useCartContext } from '../../contexts/CartContext';

// 1. Mock do hook 'useCartContext'
jest.mock('../../contexts/CartContext');

// Tipar o hook mockado para o TypeScript
const useCartContextMock = useCartContext as jest.Mock;

// Dados falsos para usar nos testes
const mockCartItems = [
  { id: 1, name: 'Produto 1', price: 100, quantity: 2, image: 'img1.jpg' },
  { id: 2, name: 'Produto 2', price: 50, quantity: 1, image: 'img2.jpg' },
];

describe('Componente CartModal', () => {
  // Funções mock para testar as interações
  const mockCloseCart = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockUpdateQuantity = jest.fn();

  // Limpa os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('não deve renderizar o modal quando isCartOpen for false', () => {
    // Organizar
    useCartContextMock.mockReturnValue({
      isCartOpen: false,
      cartItems: [],
    });

    // Atuar
    const { container } = render(<CartModal />);

    // Afirmar
    expect(container.firstChild).toBeNull();
  });

  test('deve renderizar a mensagem de carrinho vazio quando não houver itens', () => {
    // Organizar
    useCartContextMock.mockReturnValue({
      isCartOpen: true,
      cartItems: [],
      closeCart: mockCloseCart,
    });

    // Atuar
    render(<CartModal />);

    // Afirmar
    expect(screen.getByText('Seu carrinho está vazio.')).toBeInTheDocument();
  });

  test('deve renderizar os itens do carrinho corretamente', () => {
    // Organizar
    useCartContextMock.mockReturnValue({
      isCartOpen: true,
      cartItems: mockCartItems,
      closeCart: mockCloseCart,
      cartTotal: 250, // 100*2 + 50*1
    });

    // Atuar
    render(<CartModal />);

    // Afirmar
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText(/Total: R\$\s*250,00/i)).toBeInTheDocument();
  });

  test('deve chamar a função closeCart ao clicar no botão de fechar e no overlay', () => {
    // Organizar
    useCartContextMock.mockReturnValue({
      isCartOpen: true,
      cartItems: [],
      closeCart: mockCloseCart,
    });
    render(<CartModal />);

    // Atuar: Clica no botão de fechar
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    
    // Afirmar
    expect(mockCloseCart).toHaveBeenCalledTimes(1);
    
    // Atuar: Clica no overlay (o próprio container do modal)
    const overlay = screen.getByTestId('modal-overlay'); 
    fireEvent.click(overlay);
    
    // Afirmar
    expect(mockCloseCart).toHaveBeenCalledTimes(2);
  });

  test('deve chamar as funções de update e remove ao interagir com os itens', () => {
    // Organizar
    useCartContextMock.mockReturnValue({
      isCartOpen: true,
      cartItems: mockCartItems,
      closeCart: mockCloseCart,
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      cartTotal: 250,
    });
    render(<CartModal />);

    // Atuar: Clica para diminuir a quantidade do primeiro item
    const minusButtons = screen.getAllByTestId('minus-button');
    fireEvent.click(minusButtons[0]);

    // Afirmar
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1); // id 1, quantity 2-1=1

    const plusButtons = screen.getAllByTestId('plus-button');
    fireEvent.click(plusButtons[0]); 

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3); // id 1, quantity 2+1=3

    // Atuar: Clica para remover o segundo item
    const removeButtons = screen.getAllByTestId('remove-button');
    fireEvent.click(removeButtons[1]);

    // Afirmar
    expect(mockRemoveFromCart).toHaveBeenCalledWith(2); // id 2
  });
});