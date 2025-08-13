import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index'; 
import { Produto } from '../../types/types'

export interface CartItem extends Produto {
  quantity: number;
}


export interface CartState {
  cartItems: CartItem[];
  isCartOpen: boolean;
}


const initialState: CartState = {
  cartItems: [],
  isCartOpen: false,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    addToCart: (state, action: PayloadAction<Produto>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existingItem) {

        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== productIdToRemove
      );
    },

    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item.id === productId);

      if (itemToUpdate) {
        if (quantity > 0) {
          itemToUpdate.quantity = quantity;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== productId
          );
        }
      }
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    
    clearCart: (state) => {
        state.cartItems = [];
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  openCart,
  closeCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectIsCartOpen = (state: RootState) => state.cart.isCartOpen;

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);