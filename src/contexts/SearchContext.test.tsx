import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SearchProvider, useSearch } from './SearchContext';
//Organizar
// Componente de teste que consome o contexto
const TestConsumerComponent = () => {
  const { termoDeBusca, setTermoDeBusca } = useSearch();

  return (
    <div>
      <span>Termo de Busca: {termoDeBusca}</span>
      <button onClick={() => setTermoDeBusca('novo termo')}>Mudar Termo</button>
    </div>
  );
};

describe('Contexto: SearchContext', () => {

  test('deve prover o valor inicial do termoDeBusca', () => {
    // Atuar: Renderiza o Provider com o consumidor dentro
    render(
      <SearchProvider>
        <TestConsumerComponent />
      </SearchProvider>
    );

    // Afirmar: Verifica se o valor inicial (string vazia) é exibido
    expect(screen.getByText('Termo de Busca:')).toBeInTheDocument();
  });

  test('deve atualizar o termoDeBusca quando setTermoDeBusca for chamado', () => {
    // Atuar
    render(
      <SearchProvider>
        <TestConsumerComponent />
      </SearchProvider>
    );

    // Encontra o botão que dispara a atualização
    const button = screen.getByRole('button', { name: /mudar termo/i });

    // Dispara a atualização de estado dentro de 'act'
    act(() => {
      fireEvent.click(button);
    });

    // Afirmar: Verifica se o componente consumidor foi atualizado com o novo valor
    expect(screen.getByText('Termo de Busca: novo termo')).toBeInTheDocument();
  });

  test('deve lançar um erro se useSearch for usado fora de um SearchProvider', () => {
    // Suprime o erro esperado do console para manter o output do teste limpo
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Afirmar: Verifica se renderizar um componente que usa o hook sem o provider lança um erro
    expect(() => render(<TestConsumerComponent />)).toThrow('useSearch deve ser usado dentro de um SearchProvider');

    // Restaura a função original do console.error
    consoleErrorSpy.mockRestore();
  });

});