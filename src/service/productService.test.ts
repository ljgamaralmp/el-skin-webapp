import '@testing-library/jest-dom';
import api from './api'; // A instância do axios que seu serviço usa
import { productService, Produto } from './productService';
import MockAdapter from 'axios-mock-adapter';
import { API_CONFIG } from '../config/APIConfig';

// Organizar 
// Cria um mock para a instância do axios
const mockApi = new MockAdapter(api);

describe('Service: productService', () => {

  // Limpa os mocks após cada teste
  afterEach(() => {
    mockApi.reset();
  });

  test('getProducts deve retornar uma lista de produtos em caso de sucesso', async () => {
    // Organizar 
    const mockProductsData: Produto[] = [
      { id: 1, name: 'Produto 1', description: 'Desc 1', price: 100, image: 'img1.jpg', tags: [] },
      { id: 2, name: 'Produto 2', description: 'Desc 2', price: 200, image: 'img2.jpg', tags: [] }
    ];

    const endpoint = API_CONFIG.ENDPOINTS.PRODUCTS;

    // Simula uma chamada GET para o endpoint que retorna status 200 e os dados mockados
    mockApi.onGet(endpoint).reply(200, mockProductsData);

    // Atuar : Chama a função do serviço que queremos testar
    const result = await productService.getProducts();

    // Afirmar : Verifica se o resultado é o esperado
    expect(result).toEqual(mockProductsData); // O resultado deve ser igual aos dados mockados
    expect(result.length).toBe(2); // Verifica a quantidade de itens
    expect(result[0].name).toBe('Produto 1'); // Verifica um item específico
  });

  test('getProducts deve lançar um erro em caso de falha na API', async () => {
    // Organizar : Simula uma falha na API com status 500
    const endpoint = API_CONFIG.ENDPOINTS.PRODUCTS;
    // Atuar
    mockApi.onGet(endpoint).reply(500);

    //Afirmar
    // Verificamos se a chamada da função productService.getProducts() resulta em uma exceção (rejeição da Promise)
    await expect(productService.getProducts()).rejects.toThrow();
  });

});