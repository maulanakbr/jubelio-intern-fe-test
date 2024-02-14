'use client';

import * as React from 'react';

import ProductCard from '@/components/shared/product-card';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { products as getProducts } from '@/redux/slices/productSlice';
import type { GetProductsPayload } from '@/types';

type PaginationState = {
  currentPage: number;
} & GetProductsPayload;

export default function Home() {
  const [params, setParams] = React.useState<PaginationState>({
    currentPage: 1,
    limit: 10,
    skip: 0,
    select: 'title,price,category,images',
  });

  console.log(typeof setParams);

  const dispatch = useAppDispatch();
  const { products: productsData, total: totalItems } = useAppSelector(
    state => state.products,
  );

  React.useEffect(() => {
    dispatch(
      getProducts({
        limit: params.limit,
        skip: params.skip,
        select: params.select,
      }),
    );
  }, [params.skip]);

  const handleClick = (btnType: 'next' | 'prev') => {
    if (btnType === 'next') {
      setParams(prevState => ({
        ...prevState,
        currentPage: params.currentPage + 1,
        skip: params.skip + 10,
      }));
    }

    if (btnType === 'prev') {
      setParams(prevState => ({
        ...prevState,
        currentPage: params.currentPage - 1,
        skip: params.skip - 10,
      }));
    }
  };

  console.log(productsData);
  return (
    <section className="wrapper">
      <ProductCard data={productsData} />
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => handleClick('prev')}
          disabled={params.currentPage === 1 ? true : false}
        >
          Prev
        </Button>
        <p>{params.currentPage}</p>
        <Button
          variant="outline"
          onClick={() => handleClick('next')}
          disabled={
            params.currentPage === totalItems! / params.limit ? true : false
          }
        >
          Next
        </Button>
      </div>
    </section>
  );
}
