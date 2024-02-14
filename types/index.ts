// BASE TYPE
export type BaseHttpResponse = {
  total: number;
  skip: number;
  limit: number;
};

export type BaseSliceState = {
  isError: string;
  isLoading: boolean;
  isSuccess: boolean;
};

// PRODUCT
export type Product = {
  id: string;
  category: string;
  title: string;
  price: number;
  images: string[];
};

export type GetProductsPayload = {
  limit: number;
  skip: number;
  select: string;
};

export type GetProductResponse = {
  products: Product[];
} & BaseHttpResponse;

//  URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
