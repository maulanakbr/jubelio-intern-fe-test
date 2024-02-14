import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { cn, turncateString } from '@/lib';
import type { Product } from '@/types';

import { buttonVariants } from '../ui/button';
import { Card } from '../ui/card';
import Icons from './icons';

type ProductCardProps = {
  data: Product[] | null;
  classname?: string;
};

export default function ProductCard({ data, classname }: ProductCardProps) {
  return (
    <div className={cn('mb-4 grid w-full grid-cols-3 gap-4', classname)}>
      {data?.map(product => (
        <Card
          key={product.id}
          className={cn('w-[13rem] overflow-hidden')}
        >
          <Image
            className="h-[10rem] object-cover"
            src={product.images[0]}
            alt={product.id}
            width={300}
            height={300}
          />
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h2>{turncateString(product.title, 12)}</h2>
              <Link
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'full',
                })}
                href="/cart"
              >
                <Icons.shoppingCart width={16} />
              </Link>
            </div>
            <h2>{product.category}</h2>
            <h1>{product.price}</h1>
          </div>
        </Card>
      ))}
    </div>
  );
}
