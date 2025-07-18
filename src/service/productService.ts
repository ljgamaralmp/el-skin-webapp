import { API_CONFIG } from '../config/APIConfig';
import api from './api';

export interface Produto {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: Array<{
    label: string;
    type: 'protection' | 'face';
  }>;
}

export const productService = {
  async getProducts(): Promise<Produto[]> {
    const response = await api.get<Produto[]>(API_CONFIG.ENDPOINTS.PRODUCTS);
    return response.data;
  }
}