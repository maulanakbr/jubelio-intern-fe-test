import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { findCartItemIndex } from '@/lib';
import type { BaseSliceState, CartItem, Product } from '@/types';

type CartState = {
  cart: CartItem[];
} & BaseSliceState;

const initialState: CartState = {
  cart: [],
  isError: '',
  isLoading: false,
  isSuccess: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      const productItem = action.payload;
      const productItemIndex = findCartItemIndex(productItem, state.cart);

      if (productItemIndex !== undefined)
        state.cart[productItemIndex].amount += 1;
      else state.cart.push({ productItem, amount: 1 });
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
