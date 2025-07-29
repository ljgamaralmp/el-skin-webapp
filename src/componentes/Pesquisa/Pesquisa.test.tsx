import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Pesquisa from './index';
import { useSearch } from '../../contexts/SearchContext';
// Organizar
// Mock do componente filho 'Input'
jest.mock('../Input', () => {
  // O mock do Input precisa repassar o valor e o evento onChange
  return function MockInput({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return <input data-testid="mock-input" value={value} onChange={onChange} />;
  };
});

//Mock do hook 'useSearch'
jest.mock('../../contexts/SearchContext');

// Tipar o hook mockado para o TypeScript
const useSearchMock = useSearch as jest.Mock;

describe('Componente Pesquisa', () => {
  const mockSetTermoDeBusca = jest.fn();

  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  test('deve renderizar o valor inicial do termoDeBusca', () => {
    
    useSearchMock.mockReturnValue({
      termoDeBusca: 'Valor Inicial',
      setTermoDeBusca: mockSetTermoDeBusca,
    });

    // Atuar
    render(<Pesquisa />);

    // Afirmar
    // Verificamos se o nosso input mockado recebeu o valor correto
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveValue('Valor Inicial');
  });

  test('deve chamar setTermoDeBusca quando o usuário digita no input', () => {
    // Organizar
    useSearchMock.mockReturnValue({
      termoDeBusca: '',
      setTermoDeBusca: mockSetTermoDeBusca,
    });
    render(<Pesquisa />);

    // Atuar
    const input = screen.getByTestId('mock-input');
    // Simula o usuário digitando a palavra 'creme'
    fireEvent.change(input, { target: { value: 'creme' } });

    // Afirmar
    expect(mockSetTermoDeBusca).toHaveBeenCalledTimes(1);
    expect(mockSetTermoDeBusca).toHaveBeenCalledWith('creme');
  });

  test('deve renderizar o ícone de lupa', () => {
    // Organizar
    useSearchMock.mockReturnValue({
      termoDeBusca: '',
      setTermoDeBusca: mockSetTermoDeBusca,
    });

    // Atuar
    render(<Pesquisa />);

    // Afirmar
    const lupaIcon = screen.getByAltText('Ícone de Lupa');
    expect(lupaIcon).toBeInTheDocument();
  });
});