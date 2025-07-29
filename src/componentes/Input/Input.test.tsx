import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './index';

describe('Componente Input', () => {

  test('deve renderizar com o valor passado na prop "value"', () => {
    // Organizar (Arrange)
    const valorInicial = 'Teste de valor';

    // Atuar (Act): Renderiza o componente passando o valor inicial
    render(<Input value={valorInicial} onChange={() => {}} />);

    // Afirmar (Assert): Verifica se o campo de input tem o valor correto
    const inputElement = screen.getByPlaceholderText(/pesquisar produtos/i);
    expect(inputElement).toHaveValue(valorInicial);
  });

  test('deve chamar a função onChange quando o valor for alterado', () => {
    // Organizar (Arrange): Cria uma função mock para o onChange
    const mockOnChange = jest.fn();
    render(<Input value="" onChange={mockOnChange} />);
    
    const inputElement = screen.getByPlaceholderText(/pesquisar produtos/i);

    // Atuar (Act): Simula o usuário digitando no campo
    fireEvent.change(inputElement, { target: { value: 'novo texto' } });

    // Afirmar (Assert): Verifica se a função mock foi chamada
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

});