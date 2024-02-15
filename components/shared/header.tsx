'use client';

import Link from 'next/link';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { resetPage, resetSkip } from '@/redux/slices/productSlice';

import CartButton from './cart-button';

export default function Header() {
  const dispatch = useAppDispatch();
  const { cart: cartData } = useAppSelector(state => state.cart);

  const handleClick = React.useCallback(() => {
    dispatch(resetPage());
    dispatch(resetSkip());
  }, [dispatch]);

  return (
    <header className="bg-tertiary">
      <div className="wrapper flex items-center justify-between">
        <Link
          className="font-semibold"
          href="/"
          onClick={handleClick}
        >
          E-Commerce
        </Link>
        <CartButton cartLength={cartData.length} />
      </div>
    </header>
  );
}
