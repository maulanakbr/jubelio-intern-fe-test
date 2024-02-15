import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib';
import type { CartItem } from '@/types';

import { Card } from '../ui/card';

type CartCardProps = {
  data: CartItem[] | null;
  classname?: string;
};

export default function CartCard({ data, classname }: CartCardProps) {
  return (
    <div className={cn(classname)}>
      {data!.length > 0 ? (
        data?.map(cart => (
          <Card
            key={cart.productItem.id}
            className={cn(
              'mb-4 flex items-center justify-between overflow-hidden px-4 py-2',
            )}
          >
            <div className="flex items-center gap-4">
              <Image
                className="h-8 w-8 object-none"
                src={cart.productItem.images[0]}
                alt={String(cart.productItem.id)}
                width={300}
                height={300}
                priority
              />
              <h2>{cart.productItem.title}</h2>
            </div>
            <h1>Qty: {cart.amount}</h1>
          </Card>
        ))
      ) : (
        <h2 className="text-center">Cart is empty</h2>
      )}
    </div>
  );
}
