'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppSelector } from '@/hooks/useRedux';

import CartCard from '../shared/cart-card';
import { ScrollArea } from '../ui/scroll-area';

export default function CartModal() {
  const router = useRouter();
  const pathname = usePathname();

  const IsOpen = pathname.includes('/cart');

  const { cart: cartData } = useAppSelector(state => state.cart);

  return (
    <Dialog
      open={IsOpen}
      onOpenChange={() => router.push('/')}
    >
      <DialogContent className="h-[20rem] w-full rounded-md">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          {cartData ? <CartCard data={cartData} /> : <p>Cart is empty</p>}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
