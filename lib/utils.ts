import { type ClassValue, clsx } from 'clsx';
import qs from 'query-string';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import { twMerge } from 'tailwind-merge';

import type { UrlQueryParams } from '@/types';

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
