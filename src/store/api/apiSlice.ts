import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CarouselItem } from '../../pages/api/carousel';
import { Produto } from '../../service/productService'; 


export const apiSlice = createApi({
  
  reducerPath: 'api',
  
  
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 

 
  endpoints: (builder) => ({

    getCarouselItems: builder.query<CarouselItem[], void>({
      query: () => '/carousel',
    }),

   
    getProducts: builder.query<Produto[], void>({
      query: () => '/products',
    }),

   
    getProductById: builder.query<Produto, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetCarouselItemsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = apiSlice;