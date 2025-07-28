import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import OpcoesHeader from './index';

// Organizar
describe('Componente OpcoesHeader', () => {

  test('deve renderizar todas as opções de navegação do menu', () => {
    // Atuar
    render(<OpcoesHeader />);

    // Afirmar
    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Tipos de pele')).toBeInTheDocument();
    expect(screen.getByText('Necessidade')).toBeInTheDocument();
    expect(screen.getByText('Ingredientes')).toBeInTheDocument();
  });

  // Organizar
  test('deve renderizar o texto da promoção', () => {
    // Atuar 
    render(<OpcoesHeader />);
    // Afirmar  
    expect(screen.getByText(/kits até 50% off/i)).toBeInTheDocument();
  });
    // Organizar
  test('deve renderizar exatamente 4 opções no menu', () => {
    // Atuar
    render(<OpcoesHeader />);

    // Afirmar: todos os elementos que têm a função de 'listitem' <li>
    const listaDeOpcoes = screen.getAllByRole('listitem');
    expect(listaDeOpcoes).toHaveLength(4);
  });

});