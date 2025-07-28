import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './index';
import { Produto } from '../../types/types';


//Organizar
const produto: Produto = {
  id: 1,
  name: 'Produto Teste',
  description: 'Descrição do produto teste',
  price: 99.99,
  image: 'https://via.placeholder.com/150',
  tags: [
    { label: 'Proteção', type: 'protection' },
    { label: 'Rosto', type: 'face' }
  ]
};

const handleProductClick = jest.fn();
const handleAddToCart = jest.fn();

//Organizar
test('componente ProductCard deve ser renderizado', () => {

  // Atuar
  render(<ProductCard
    key={produto.id}
    produto={produto}
    onAddToCart={handleAddToCart}
    onProductClick={handleProductClick}
  />);

  // Afirmar
  expect(screen.getByText('Produto Teste')).toBeInTheDocument();
});

//Organizar
test('deve acionar o método onProductClick quando o produto for clicado', () => {
  render(<ProductCard
    key={produto.id}
    produto={produto}
    onProductClick={handleProductClick}
    onAddToCart={handleAddToCart}
  />);

  // Atuar
  const card = screen.getByTestId('product-card');
  fireEvent.click(card);

  // Afirmar
  expect(handleProductClick).toBeCalledWith('1');
  expect(handleProductClick).toHaveBeenCalledTimes(1);
});

//Organizar
test('deve acionar o método onAddToCart quando o botão comprar for clicado', () => {
  render(<ProductCard
    key={produto.id}
    produto={produto}
    onProductClick={handleProductClick}
    onAddToCart={handleAddToCart}
  />);
// Atuar
  const card = screen.getByTestId('add-to-cart-button');
  fireEvent.click(card);
//afirmar
  expect(handleAddToCart).toBeCalledWith(produto);
  expect(handleAddToCart).toHaveBeenCalledTimes(1);
});