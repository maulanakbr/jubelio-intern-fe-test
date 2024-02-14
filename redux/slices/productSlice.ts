import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import type { BaseSliceState, GetProductsPayload, Product } from '@/types';

import { getProducts } from '../services/product';

type ProductsState = {
  products: Product[] | null;
  total: number | null;
} & BaseSliceState;

const initialState: ProductsState = {
  products: null,
  total: null,
  isError: '',
  isLoading: false,
  isSuccess: false,
};

export const products = createAsyncThunk(
  'product/items',
  async (payload: GetProductsPayload) => {
    try {
      const { data } = await getProducts(
        `?limit=${payload.limit}&skip=${payload.skip}&select=${payload.select}` as unknown as GetProductsPayload,
      );

      return data;
    } catch (error) {
      const err = error as AxiosError;
      throw new Error(err.message);
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(products.pending, state => {
        state.isLoading = true;
      })
      .addCase(products.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(products.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error.message || '';
      });
  },
});

export const productsReducer = productSlice.reducer;
