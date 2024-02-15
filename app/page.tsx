'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';

import NotFound from '@/components/shared/not-found';
import ProductCard from '@/components/shared/product-card';
import Search from '@/components/shared/search';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { LIMIT_PER_PAGE, SELECT_QUERY } from '@/lib';
import { products as getProducts } from '@/redux/slices/productSlice';

export default function Home() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const { products: productsData, currentSkip } = useAppSelector(
    state => state.products,
  );

  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname === '/' && !searchParams.toString()) {
      dispatch(
        getProducts({
          limit: LIMIT_PER_PAGE,
          skip: currentSkip,
          select: SELECT_QUERY,
        }),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentSkip, searchParams.toString()]);

  return (
    <section className="wrapper">
      <h2 className="mb-4 text-[1.3rem] font-semibold">Produk</h2>
      <hr className="mb-8" />
      <div className="mb-3 flex w-full flex-col justify-between lg:flex-row">
        <Search
          limit={LIMIT_PER_PAGE}
          skip={currentSkip}
          select={SELECT_QUERY}
        />
        {productsData?.length === 0 ? (
          <NotFound />
        ) : (
          <ProductCard data={productsData} />
        )}
      </div>
    </section>
  );
}
