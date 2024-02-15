import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib';
import type { CartItem } from '@/types';

import { Card } from '../ui/card';
import Skeleton from '../ui/skeleton';

type CartCardProps = {
  data: CartItem[] | null;
  loading: boolean;
};

export default function CartCard({ data, loading }: CartCardProps) {
  return (
    <div>
      {data!.length > 0 ? (
        data?.map(cart => (
          <Card
            key={cart.productItem.id}
            className={cn(
              'mb-4 flex items-center justify-between overflow-hidden px-4 py-2',
            )}
          >
            <div className="flex items-center gap-4">
              {!loading ? (
                <Image
                  className="h-8 w-8 object-contain"
                  src={cart.productItem.images[0]}
                  alt={String(cart.productItem.id)}
                  width={300}
                  height={300}
                  priority
                />
              ) : (
                <Skeleton className="inline-block h-[10rem] w-full" />
              )}
              <h2 className="text-balance text-sm leading-normal">
                {cart.productItem.title}
              </h2>
            </div>
            <p className="text-balance text-xs leading-normal">
              Qty: {cart.amount}
            </p>
          </Card>
        ))
      ) : (
        <h2 className="text-center">Cart is empty</h2>
      )}
    </div>
  );
}
