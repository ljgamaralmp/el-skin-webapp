import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '../../config/APIConfig'; 
import { CarouselProps } from '../../service/carouselService'; 
import { Produto } from '../../service/productService'; 


export const apiSlice = createApi({
  
  reducerPath: 'api',
  
  
  baseQuery: fetchBaseQuery({ baseUrl: API_CONFIG.BASE_URL }), 

 
  endpoints: (builder) => ({
 
    getCarouselItems: builder.query<CarouselProps[], void>({
      query: () => API_CONFIG.ENDPOINTS.CAROUSEL,
    }),

   
    getProducts: builder.query<Produto[], void>({
      query: () => API_CONFIG.ENDPOINTS.PRODUCTS,
    }),

   
    getProductById: builder.query<Produto, string>({
      query: (id) => `${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`,
    }),
  }),
});

export const {
  useGetCarouselItemsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = apiSlice;