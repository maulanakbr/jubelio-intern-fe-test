'use client';

import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { currencyConverter, sumTotalAmountCart } from '@/lib';
import { resetCart } from '@/redux/slices/cartSlice';

import CartCard from '../shared/cart-card';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

export default function CartModal() {
  const router = useRouter();
  const pathname = usePathname();
  const IsOpen = pathname.includes('/cart');

  const dispatch = useAppDispatch();
  const { cart: cartData, isLoading } = useAppSelector(state => state.cart);
  const totalAmount = sumTotalAmountCart(cartData);

  const handleCheckout = React.useCallback(() => {
    dispatch(resetCart());
    router.push('/');
  }, []);

  return (
    <Dialog
      open={IsOpen}
      onOpenChange={() => router.push('/')}
    >
      <DialogContent
        className={
          cartData.length > 0
            ? 'flex h-[20rem] w-[20rem] flex-col justify-between rounded-md sm:w-full'
            : 'flex h-[8rem] w-[20rem] flex-col justify-center rounded-md sm:w-full'
        }
      >
        <DialogHeader className="mb-3">
          <DialogTitle>Cart</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mb-2">
          {cartData.length > 0 ? (
            <CartCard
              data={cartData}
              loading={isLoading}
            />
          ) : (
            <p>Cart is empty</p>
          )}
        </ScrollArea>
        {cartData.length > 0 ? (
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium leading-normal text-zinc-400">
                Total Amount :
              </h2>
              <h2 className="md:text-md text-balance text-sm font-medium leading-normal">
                {currencyConverter(totalAmount)}
              </h2>
            </div>
            <Button
              size="sm"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
