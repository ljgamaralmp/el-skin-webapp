import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { productService } from '../../service/productService'; 
import { Produto } from '../../types/types';


interface ProductsState {
  products: Produto[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  currentProduct: Produto | null;
  currentProductLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  products: [],
  loading: 'idle',
  error: null,
  currentProduct: null,
  currentProductLoading: 'idle',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productService.getProducts();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Falha ao buscar produtos');
    }
  }
);

export const fetchProductById = createAsyncThunk<Produto, string>(
  'products/fetchProductById',
  async (productId: string, { rejectWithValue }) => {
    try {
      const data = await productService.getProductById(productId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || `Falha ao buscar o produto ${productId}`);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Produto[]>) => {
        state.loading = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      // Casos para fetchProductById (produto individual)
      .addCase(fetchProductById.pending, (state) => {
        state.currentProductLoading = 'pending';
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Produto>) => {
        state.currentProductLoading = 'succeeded';
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.currentProductLoading = 'failed';
      });
  },
});

export default productsSlice.reducer;