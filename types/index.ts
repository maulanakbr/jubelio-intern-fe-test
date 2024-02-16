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

export type BaseProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

// PRODUCT
export type Product = Pick<
  BaseProduct,
  'id' | 'title' | 'price' | 'category' | 'images'
>;

export type GetProductsPayload = {
  limit: number;
  skip: number;
  select: string;
};

export type GetProductResponse = {
  products: Product[];
} & BaseHttpResponse;

export type SearchProductsPayload = {
  query: string;
} & GetProductsPayload;

export type SearchProductsResponse = {
  products: Product[];
} & BaseHttpResponse;

// CART
export type CartItem = {
  productItem: Product;
  amount: number;
};
