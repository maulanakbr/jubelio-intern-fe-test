'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { resetPage, resetSkip } from '@/redux/slices/productSlice';

import { Button } from '../ui/button';
import CartButton from './cart-button';

export default function Header() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { cart: cartData } = useAppSelector(state => state.cart);

  const handleClick = () => {
    dispatch(resetPage());
    dispatch(resetSkip());

    router.replace('/');
  };

  return (
    <header className="bg-tertiary">
      <div className="wrapper flex items-center justify-between">
        <Button
          className="text-md p-0 font-semibold"
          variant="link"
          onClick={handleClick}
        >
          E-Commerce
        </Button>
        <CartButton cartLength={cartData.length} />
      </div>
    </header>
  );
}
