import Image from 'next/image';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
  collectAllIndexesFromCart,
  currencyConverter,
  turncateString,
  upperCaseFirstLetter,
} from '@/lib';
import { addProduct } from '@/redux/slices/cartSlice';
import type { Product } from '@/types';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import Skeleton from '../ui/skeleton';
import Icons from './icons';

type ProductCardProps = {
  data: Product[] | null;
  loading: boolean;
};

export default function ProductCard({ data, loading }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { cart: cartData } = useAppSelector(state => state.cart);

  const [isAddedToCart, setIsAddedToCart] = React.useState<number[]>(
    collectAllIndexesFromCart(cartData),
  );

  const handleClick = React.useCallback(
    (product: Product) => {
      if (isAddedToCart.length > 0 && cartData.length === 0)
        setIsAddedToCart([-1]);

      dispatch(addProduct(product));
      setIsAddedToCart(prevState => [...prevState, product.id]);
    },
    [dispatch, cartData.length, isAddedToCart],
  );

  return (
    <section>
      <div className="mb-4 grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data?.map(product => (
          <Card
            key={product.id}
            className="w-full overflow-hidden"
          >
            {!loading ? (
              <Image
                className="inline-block h-[10rem] w-full object-cover"
                src={product.images[0]}
                alt={String(product.id)}
                width={300}
                height={300}
                priority
              />
            ) : (
              <Skeleton className="inline-block h-[10rem] w-full" />
            )}
            <div className="h-full p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-balance text-sm leading-normal">
                  {turncateString(product.title, 10)}
                </h2>
                {!isAddedToCart.includes(product.id) ||
                cartData.length === 0 ? (
                  <Button
                    className="h-full"
                    variant="ghost"
                    size="full"
                    onClick={() => handleClick(product)}
                  >
                    <Icons.shoppingCart width={16} />
                  </Button>
                ) : (
                  <div className="flex min-h-[23px] w-[23px] justify-center rounded-full bg-green-700 text-gray-50">
                    <Icons.checkIcon
                      className="inline-flex text-center"
                      width={16}
                    />
                  </div>
                )}
              </div>
              <h2 className="text-balance text-sm leading-normal">
                {upperCaseFirstLetter(product.category)}
              </h2>
              <h1 className="md:text-md text-balance text-sm font-semibold leading-tight">
                {currencyConverter(product.price)}
              </h1>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
