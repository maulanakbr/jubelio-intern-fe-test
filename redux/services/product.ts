import { AxiosResponse } from 'axios';

import instance from '@/config';
import type {
  GetProductResponse,
  GetProductsPayload,
  SearchProductsPayload,
  SearchProductsResponse,
} from '@/types';

export const getProducts = async (
  params: GetProductsPayload,
): Promise<AxiosResponse<GetProductResponse>> => {
  const result: AxiosResponse<GetProductResponse> = await instance.get(
    `/products${params}`,
  );

  return result;
};

export const searchProducts = async (
  params: SearchProductsPayload,
): Promise<AxiosResponse<SearchProductsResponse>> => {
  const result: AxiosResponse<SearchProductsResponse> = await instance.get(
    `/products/search${params}`,
  );

  return result;
};
