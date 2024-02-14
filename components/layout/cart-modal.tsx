'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function CartModal() {
  const router = useRouter();
  const pathname = usePathname();

  const IsOpen = pathname.includes('/cart');

  return (
    <Dialog
      open={IsOpen}
      onOpenChange={() => router.push('/')}
    >
      <DialogContent className="w-full max-w-[400px] rounded-md">
        <DialogHeader>
          <DialogTitle>
            <h2 className="font-semibold tracking-tight transition-colors">
              Produk
            </h2>
          </DialogTitle>
        </DialogHeader>
        <p>Cart is empty</p>
      </DialogContent>
    </Dialog>
  );
}
