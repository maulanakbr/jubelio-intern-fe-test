import Image from 'next/image';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { cn, collectAllIndexesFromCart, turncateString } from '@/lib';
import { addProduct } from '@/redux/slices/cartSlice';
import type { Product } from '@/types';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import Icons from './icons';

type ProductCardProps = {
  data: Product[] | null;
  classname?: string;
};

export default function ProductCard({ data, classname }: ProductCardProps) {
  const { cart: cartData } = useAppSelector(state => state.cart);

  const [isAddedToCart, setIsAddedToCart] = React.useState<number[]>(
    collectAllIndexesFromCart(cartData),
  );

  const dispatch = useAppDispatch();

  const handleClick = React.useCallback(
    (product: Product) => {
      dispatch(addProduct(product));
      setIsAddedToCart(prevState => [...prevState, product.id]);
    },
    [dispatch],
  );

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
            alt={String(product.id)}
            width={300}
            height={300}
          />
          <div className="h-full p-4">
            <div className="flex min-h-[4rem] items-center justify-between">
              <h2>{turncateString(product.title, 12)}</h2>
              {!isAddedToCart.includes(product.id) ? (
                <Button
                  variant="ghost"
                  size="full"
                  onClick={() => handleClick(product)}
                >
                  <Icons.shoppingCart width={16} />
                </Button>
              ) : (
                <Icons.checkIcon width={16} />
              )}
            </div>
            <h2>{product.category}</h2>
            <h1>{product.price}</h1>
          </div>
        </Card>
      ))}
    </div>
  );
}
