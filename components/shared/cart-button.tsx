import Link from 'next/link';
import React from 'react';

import { buttonVariants } from '../ui/button';
import Icons from './icons';

type CartButtonProps = {
  cartLength: number;
};

export default function CartButton({ cartLength }: CartButtonProps) {
  return (
    <Link
      className={
        (buttonVariants({ variant: 'ghost', size: 'full' }), 'relative')
      }
      href="/cart"
    >
      <Icons.shoppingCart />
      {cartLength > 0 ? (
        <p className="absolute left-[-16px] top-0 h-[15px] w-[15px] rounded-full bg-red-500 text-center text-[10px] font-bold text-background">
          {cartLength}
        </p>
      ) : null}
    </Link>
  );
}
