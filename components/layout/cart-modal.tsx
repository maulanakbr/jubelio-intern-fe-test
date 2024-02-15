'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppSelector } from '@/hooks/useRedux';
import { currencyConverter, sumTotalAmountCart } from '@/lib';

import CartCard from '../shared/cart-card';
import { ScrollArea } from '../ui/scroll-area';

export default function CartModal() {
  const router = useRouter();
  const pathname = usePathname();
  const IsOpen = pathname.includes('/cart');

  const { cart: cartData } = useAppSelector(state => state.cart);
  const totalAmount = sumTotalAmountCart(cartData);

  return (
    <Dialog
      open={IsOpen}
      onOpenChange={() => router.push('/')}
    >
      <DialogContent className="flex h-[20rem] w-[20rem] flex-col justify-start rounded-md sm:w-full">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          {cartData ? <CartCard data={cartData} /> : <p>Cart is empty</p>}
        </ScrollArea>
        <div>
          <h2 className="text-sm font-medium leading-normal text-zinc-400">
            Total Amount :
          </h2>
          <h2 className="text-md text-balance font-medium leading-normal">
            {currencyConverter(totalAmount)}
          </h2>
        </div>
      </DialogContent>
    </Dialog>
  );
}
