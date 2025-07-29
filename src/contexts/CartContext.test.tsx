import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CartProvider, useCartContext } from './CartContext'; 
import { useCart } from '../hooks/useCart';

// Organizar
jest.mock('../hooks/useCart');

// Tipar o hook mockado para o TypeScript
const useCartMock = useCart as jest.Mock;

const TestConsumerComponent = () => {
  const { cartItems, cartTotal } = useCartContext();

  return (
    <div>
      <p>Total de itens: {cartItems.length}</p>
      <p>Valor total: R$ {cartTotal}</p>
    </div>
  );
};

describe('Componente CartProvider', () => {

  test('deve prover os valores do carrinho para os componentes filhos', () => {
    // Organizar (Arrange): Define o valor que o `useCart` mockado deve retornar
    const mockCartValue = {
      cartItems: [
        { id: 1, name: 'Produto Teste', price: 100, quantity: 2 }
      ],
      cartTotal: 200,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
    };

    useCartMock.mockReturnValue(mockCartValue);

    // Atuar (Act): Renderiza o Provider com o componente consumidor dentro dele
    render(
      <CartProvider>
        <TestConsumerComponent />
      </CartProvider>
    );

    // Afirmar (Assert): Verifica se o componente consumidor recebeu e exibiu os dados corretamente
    expect(screen.getByText('Total de itens: 1')).toBeInTheDocument();
    expect(screen.getByText('Valor total: R$ 200')).toBeInTheDocument();
  });

});