import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { findCartItemIndex } from '@/lib';
import type { BaseSliceState, CartItem, Product } from '@/types';

type CartState = {
  cart: CartItem[];
} & Pick<BaseSliceState, 'isLoading'>;

const initialState: CartState = {
  cart: [],
  isLoading: false,
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
    resetCart(state) {
      state.cart = [];
    },
  },
});

export const { addProduct, resetCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
