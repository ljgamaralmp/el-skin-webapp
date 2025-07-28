import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import ProductShowcase from './index';

//Organizar

const mockProducts = [
  {
    id: '1',
    name: 'Produto 1',
    description: 'Descrição do produto 1',
    price: 99.99,
    image: '/image1.jpg',
    tags: [{ label: 'Proteção', type: 'protection' as const }]
  },
  {
    id: '2',
    name: 'Produto 2',
    description: 'Descrição do produto 2',
    price: 149.99,
    image: '/image2.jpg',
    tags: [{ label: 'Rosto', type: 'face' as const }]
  }
];

// Mock dos serviços
jest.mock('../../service/productService', () => ({
  productService: {
    getProducts: () => mockProducts,
  },
}));

// Mock do SearchContext para controlar o termo de busca
let mockTermoDeBusca = '';

const mockAddItem = jest.fn();

jest.mock('../../contexts/SearchContext', () => ({
  useSearch: () => ({
    termoDeBusca: mockTermoDeBusca,
  }),
}));

jest.mock('../../contexts/CartContext', () => ({
  useCart: () => ({
    addToCart: mockAddItem
  }),
}));

// Função auxiliar para renderizar com act. Ela é necessaria sempre que houver atualizações de estado que precisam ser 
// finalizadas antes que você possa verificar o resultado final na tela.
const renderWithAct = async () => {
  let component;
  await act(async () => {
    component = render(<ProductShowcase />);
  });
  return component;
};

//organizar
test('deve exibir produtos corretamente', async () => {
  //Atuar
  await renderWithAct();
  //Afirmar
  expect(screen.getByText('Produto 1')).toBeInTheDocument();
  expect(screen.getByText('Descrição do produto 1')).toBeInTheDocument();
  expect(screen.getByText('R$ 99,99')).toBeInTheDocument();

  expect(screen.getByText('Produto 2')).toBeInTheDocument();
  expect(screen.getByText('Descrição do produto 2')).toBeInTheDocument();
  expect(screen.getByText('R$ 149,99')).toBeInTheDocument();
});
//organizar
test('Deve chamar console.log ao clicar no produto', async () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  // Atuar
  await renderWithAct();

  const productCard = screen.getByText('Produto 1');
  productCard.click();
  // Afirmar
  expect(consoleSpy).toHaveBeenCalledWith('Produto clicado: 1');
});
//Organizar
test('Deve chamar addItem ao clicar no botão comprar', async () => {
  // Atuar
  await renderWithAct();

  // Afirmar
  const buyButtons = screen.getAllByTestId('add-to-cart-button');
  buyButtons[0].click();
  expect(mockAddItem).toHaveBeenCalledTimes(1);
});

//organizar
test('Deve filtrar produtos com base no termo de busca', async () => {
  mockTermoDeBusca = 'Produto 1';
  // Atuar
  await renderWithAct();
  // Afirmar
  expect(screen.getByText('Produto 1')).toBeInTheDocument();
  expect(screen.queryByText('Produto 2')).not.toBeInTheDocument();
});
