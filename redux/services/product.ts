import { AxiosResponse } from 'axios';

import instance from '@/config';
import type { GetProductResponse, GetProductsPayload } from '@/types';

export const getProducts = async (
  params: GetProductsPayload,
): Promise<AxiosResponse<GetProductResponse>> => {
  const result: AxiosResponse<GetProductResponse> = await instance.get(
    `/products${params}`,
  );

  return result;
};
