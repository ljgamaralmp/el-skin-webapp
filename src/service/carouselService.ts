import api from './api';
import { API_CONFIG } from '../config/APIConfig';

export interface CarouselProps {
    id:number;
    subtitle:string;
    title: string;
    description:string;
    backgroundImage:string;
}

export const carouselService = {
  async getCarouselItems(): Promise<CarouselProps[]> {
    const response = await api.get<CarouselProps[]>(API_CONFIG.ENDPOINTS.CAROUSEL);
    return response.data;
  },
};