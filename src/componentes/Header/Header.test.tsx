import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './index';


// Mock dos filhos
//organizar
jest.mock('./Topo', () => {
  return function MockTopo() {
    return <div data-testid="mock-topo">Topo Component</div>;
  };
});

jest.mock('./OpcoesHeader', () => {
  return function MockOpcoesHeader() {
    return <div data-testid="mock-opcoes-header">OpcoesHeader Component</div>;
  };
});

describe('Componente Header', () => {
  test('deve renderizar os componentes Topo e OpcoesHeader', () => {
    // Atuar 
    render(<Header />);

    // Afirmar 
    expect(screen.getByTestId('mock-topo')).toBeInTheDocument();
    expect(screen.getByTestId('mock-opcoes-header')).toBeInTheDocument();
  });
});