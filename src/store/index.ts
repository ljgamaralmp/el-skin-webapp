import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productSlice';

import { apiSlice } from './api/apiSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  cart: cartReducer,
  products: productsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

// instância do store para ser usada pela sua aplicação principal.
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];