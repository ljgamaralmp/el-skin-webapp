import '@testing-library/jest-dom';
import api from './api'; // A instância do axios que seu serviço usa
import { carouselService, CarouselProps } from './carouselService';
import MockAdapter from 'axios-mock-adapter';
import { API_CONFIG } from '../config/APIConfig';
//Organizar
// Cria um mock para a instância do axios
const mockApi = new MockAdapter(api);

describe('Service: carouselService', () => {

  // Limpa os mocks após cada teste para garantir isolamento
  afterEach(() => {
    mockApi.reset();
  });

  test('getCarouselItems deve retornar uma lista de itens do carrossel em caso de sucesso', async () => {
    // Organizar
    const mockCarouselData: CarouselProps[] = [
      { id: 1, subtitle: 'Subtítulo 1', title: 'Título 1', description: 'Desc 1', backgroundImage: 'img1.png' },
      { id: 2, subtitle: 'Subtítulo 2', title: 'Título 2', description: 'Desc 2', backgroundImage: 'img2.png' },
    ];

    const endpoint = API_CONFIG.ENDPOINTS.CAROUSEL;

    // Simula uma chamada GET bem-sucedida para o endpoint do carrossel
    mockApi.onGet(endpoint).reply(200, mockCarouselData);

    // Atuar: Chama a função do serviço
    const result = await carouselService.getCarouselItems();

    // Afirmar : Verifica se o resultado é o esperado
    expect(result).toEqual(mockCarouselData);
    expect(result.length).toBe(2);
    expect(result[0].title).toBe('Título 1');
  });

  test('getCarouselItems deve lançar um erro em caso de falha na API', async () => {
    // Organizar: Simula uma falha na API (ex: erro de servidor)
    const endpoint = API_CONFIG.ENDPOINTS.CAROUSEL;
    mockApi.onGet(endpoint).reply(500);

    // Atuar e Afirmar:
    // Verifica se a chamada à função resulta em uma rejeição da Promise (erro)
    await expect(carouselService.getCarouselItems()).rejects.toThrow();
  });

});