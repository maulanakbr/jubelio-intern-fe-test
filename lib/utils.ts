import { type ClassValue, clsx } from 'clsx';
import qs from 'query-string';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import { twMerge } from 'tailwind-merge';

import type { CartItem, Product, UrlQueryParams } from '@/types';

import { DOLLAR_TO_IDR } from '.';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createPersistStore() {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage('local');
}

export function turncateString(input: string, amount: number): string {
  if (amount > input.length) return input;
  return `${input.substring(0, amount)}...`;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}

export const findCartItemIndex = (productItem: Product, cart: CartItem[]) => {
  const cartItemIndex = cart.findIndex(
    cartItem => cartItem.productItem.id === productItem.id,
  );

  if (cartItemIndex === -1) {
    return undefined;
  } else {
    return cartItemIndex;
  }
};

export const collectAllIndexesFromCart = (cart: CartItem[]) => {
  const allIndexesFromCart: number[] = [];

  cart.forEach(item => {
    allIndexesFromCart.push(item.productItem.id);
  });

  return allIndexesFromCart;
};

export const sumTotalAmountCart = (cart: CartItem[]): number => {
  return cart.reduce((prev, acc) => acc.productItem.price + prev, 0);
};

export const currencyConverter = (currency: number) => {
  const amount = currency * DOLLAR_TO_IDR;

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};

export const extractQueryParams = (query: string) => {
  return query.split('')[2];
};
