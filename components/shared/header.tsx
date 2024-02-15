'use client';

import Link from 'next/link';
import * as React from 'react';

import { useAppDispatch } from '@/hooks/useRedux';
import { resetPage, resetSkip } from '@/redux/slices/productSlice';

import { buttonVariants } from '../ui/button';
import Icons from './icons';

export default function Header() {
  const dispatch = useAppDispatch();

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
        <Link
          className={buttonVariants({ variant: 'ghost', size: 'full' })}
          href="/cart"
        >
          <Icons.shoppingCart />
        </Link>
      </div>
    </header>
  );
}
