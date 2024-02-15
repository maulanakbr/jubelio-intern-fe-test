'use client';

import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import Pagination from '@/components/shared/pagination';
import ProductCard from '@/components/shared/product-card';
import Search from '@/components/shared/search';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { products as getProducts } from '@/redux/slices/productSlice';
import type { GetProductsPayload } from '@/types';

type PaginationState = {
  currentPage: number;
} & GetProductsPayload;

// Omit<PaginationState, 'currentPage'>
export default function Home() {
  const {
    products: productsData,
    total: totalItems,
    currentPage,
  } = useAppSelector(state => state.products);

  const [params, setParams] = React.useState<PaginationState>({
    currentPage,
    limit: 10,
    skip: 0,
    select: 'title,price,category,images',
  });

  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (!searchParams.toString()) {
      dispatch(
        getProducts({
          limit: params.limit,
          skip: params.skip,
          select: params.select,
        }),
      );
    }
  }, [params.skip, searchParams, params.currentPage]);

  const handleClick = (btnType: 'next' | 'prev') => {
    if (btnType === 'next') {
      setParams(prevState => ({
        ...prevState,
        currentPage: params.currentPage + 1,
        skip: params.skip + 10,
      }));

      // addPage({
      //   add: 1,
      // });

      console.log(currentPage);
    }

    if (btnType === 'prev') {
      setParams(prevState => ({
        ...prevState,
        currentPage: params.currentPage - 1,
        skip: params.skip - 10,
      }));

      // substractPage({
      //   sub: 1,
      // });
    }
  };

  return (
    <section className="wrapper">
      <Search
        limit={params.limit}
        skip={params.skip}
        select={params.select}
      />
      <ProductCard data={productsData} />
      <Pagination
        currentPage={params.currentPage}
        limit={params.limit}
        totalItems={totalItems}
        handleClick={handleClick}
      />
    </section>
  );
}
