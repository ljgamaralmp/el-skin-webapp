import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Carousel from './index';
import { carouselService } from '../../service/carouselService';
// Organizar
jest.mock('../../service/carouselService');

// Tipar o mock para o TypeScript
const carouselServiceMock = carouselService as jest.Mocked<typeof carouselService>;

// Dados falsos para usar nos testes
const mockItems = [
  { id: 1, subtitle: 'Subtítulo 1', title: 'Título 1', description: 'Desc 1', backgroundImage: 'img1.png' },
  { id: 2, subtitle: 'Subtítulo 2', title: 'Título 2', description: 'Desc 2', backgroundImage: 'img2.png' },
  { id: 3, subtitle: 'Subtítulo 3', title: 'Título 3', description: 'Desc 3', backgroundImage: 'img3.png' },
];
// Organizar
describe('Componente Carousel', () => {

  // Habilita o controle do tempo (setInterval)
  beforeAll(() => {
    jest.useFakeTimers();
  });

  // Limpa os mocks e reseta o tempo após cada teste
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  
  // Desabilita o controle do tempo ao final de todos os testes
  afterAll(() => {
    jest.useRealTimers();
  });
// Organizar
  test('deve buscar os dados e renderizar o primeiro slide corretamente', async () => {
    
    carouselServiceMock.getCarouselItems.mockResolvedValue(mockItems);

    // Atuar
    await act(async () => {
      render(<Carousel />);
    });

    // Afirmar
    expect(await screen.findByText('Título 1')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo 1')).toBeInTheDocument();
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
  });

  test('deve navegar para o próximo slide ao clicar no botão "Próximo"', async () => {
    // Organizar
    carouselServiceMock.getCarouselItems.mockResolvedValue(mockItems);
    await act(async () => {
      render(<Carousel />);
    });

    // Atuar
    const proximoButton = screen.getByRole('button', { name: /próximo/i });
    fireEvent.click(proximoButton);

    // Afirmar
    expect(await screen.findByText('Título 2')).toBeInTheDocument();
  });
  
  test('deve navegar para o slide anterior ao clicar no botão "Anterior"', async () => {
    // Organizar
    carouselServiceMock.getCarouselItems.mockResolvedValue(mockItems);
    await act(async () => {
      render(<Carousel />);
    });
    
    // Atuar
    const anteriorButton = screen.getByRole('button', { name: /anterior/i });
    fireEvent.click(anteriorButton);

    // Afirmar: Como começa no primeiro, ao clicar em "anterior" deve ir para o último (item 3)
    expect(await screen.findByText('Título 3')).toBeInTheDocument();
  });

  test('deve avançar para o próximo slide automaticamente após 4 segundos', async () => {
    // Organizar
    carouselServiceMock.getCarouselItems.mockResolvedValue(mockItems);
    await act(async () => {
      render(<Carousel />);
    });
    
    // Afirmar: Verifica se o primeiro slide está visível
    expect(screen.getByText('Título 1')).toBeInTheDocument();

    // Atuar: Avança o tempo em 4 segundos
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Afirmar: Verifica se o carrossel avançou para o segundo slide
    expect(await screen.findByText('Título 2')).toBeInTheDocument();
  });
});