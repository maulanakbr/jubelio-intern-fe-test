import Image from 'next/image';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
  cn,
  collectAllIndexesFromCart,
  currencyConverter,
  LIMIT_PER_PAGE,
  turncateString,
} from '@/lib';
import { addProduct } from '@/redux/slices/cartSlice';
import {
  addPage,
  addSkip,
  substractPage,
  substractSkip,
} from '@/redux/slices/productSlice';
import type { Product } from '@/types';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import Icons from './icons';
import Pagination from './pagination';

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
  const { total: totalItems, currentPage } = useAppSelector(
    state => state.products,
  );

  const handleClick = React.useCallback(
    (product: Product) => {
      dispatch(addProduct(product));
      setIsAddedToCart(prevState => [...prevState, product.id]);
    },
    [dispatch],
  );

  const handlePagination = (btnType: 'next' | 'prev') => {
    switch (btnType) {
      case 'next':
        dispatch(
          addPage({
            add: 1,
          }),
        );

        dispatch(
          addSkip({
            add: 10,
          }),
        );
        break;
      case 'prev':
        dispatch(
          substractPage({
            sub: 1,
          }),
        );

        dispatch(
          substractSkip({
            sub: 10,
          }),
        );
        break;
      default:
        null;
    }
  };

  return (
    <section className="cursor-pointer">
      <div
        className={cn(
          'mb-4 grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4',
          classname,
        )}
      >
        {data?.map(product => (
          <Card
            key={product.id}
            className="w-full overflow-hidden"
          >
            <Image
              className="inline-block h-[10rem] w-full object-cover md:w-[13rem]"
              src={product.images[0]}
              alt={String(product.id)}
              width={300}
              height={300}
            />
            <div className="h-full p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-balance text-sm  leading-normal">
                  {turncateString(product.title, 14)}
                </h2>
                {!isAddedToCart.includes(product.id) ? (
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
                {product.category}
              </h2>
              <h1 className="text-md text-balance font-medium leading-normal">
                {currencyConverter(product.price)}
              </h1>
            </div>
          </Card>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        limit={LIMIT_PER_PAGE}
        totalItems={totalItems}
        handleClick={handlePagination}
      />
    </section>
  );
}
