import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import type {
  BaseSliceState,
  GetProductsPayload,
  Product,
  SearchProductsPayload,
} from '@/types';

import { getProducts, searchProducts } from '../services/product';

type ProductsState = {
  products: Product[] | null;
  total: number | null;
  currentPage: number;
} & BaseSliceState;

type CurrentPagePayload = {
  add: number;
  sub: number;
};

const initialState: ProductsState = {
  products: null,
  total: null,
  currentPage: 1,
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

export const getProductsBySearch = createAsyncThunk(
  'product/search',
  async (payload: SearchProductsPayload) => {
    try {
      const { data } = await searchProducts(
        `?q=${payload.query}&limit=${payload.limit}&skip=${payload.skip}&select=${payload.select}` as unknown as SearchProductsPayload,
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
  reducers: {
    addPage(state, action: PayloadAction<Omit<CurrentPagePayload, 'sub'>>) {
      let page = state.currentPage;

      if (page === null) page = action.payload.add;
      page += action.payload.add;
    },
    substractPage(state, action: PayloadAction<{ sub: number }>) {
      let page = state.currentPage;
      page! -= action.payload.sub;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(products.pending, state => {
        state.isLoading = true;
      })
      .addCase(products.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.currentPage = 1;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(products.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error.message || '';
      });
    builder
      .addCase(getProductsBySearch.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProductsBySearch.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getProductsBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error.message || '';
      });
  },
});

export const { addPage, substractPage } = productSlice.actions;
export const productsReducer = productSlice.reducer;
