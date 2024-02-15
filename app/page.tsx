'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';

import ProductCard from '@/components/shared/product-card';
import Search from '@/components/shared/search';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { LIMIT_PER_PAGE, SELECT_QUERY } from '@/lib';
import { products as getProducts } from '@/redux/slices/productSlice';

export default function Home() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const {
    products: productsData,
    // total: totalItems,
    // currentPage,
    currentSkip,
  } = useAppSelector(state => state.products);

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

  // const handleClick = (btnType: 'next' | 'prev') => {
  //   switch (btnType) {
  //     case 'next':
  //       dispatch(
  //         addPage({
  //           add: 1,
  //         }),
  //       );

  //       dispatch(
  //         addSkip({
  //           add: 10,
  //         }),
  //       );
  //       break;
  //     case 'prev':
  //       dispatch(
  //         substractPage({
  //           sub: 1,
  //         }),
  //       );

  //       dispatch(
  //         substractSkip({
  //           sub: 10,
  //         }),
  //       );
  //       break;
  //     default:
  //       null;
  //   }
  // };

  return (
    <section className="wrapper">
      <h2 className="mb-4 text-[1.3rem] font-semibold">Produk</h2>
      <hr className="mb-8" />
      <div className="mb-3 flex w-full flex-col justify-stretch lg:flex-row lg:gap-[6rem]">
        <Search
          limit={LIMIT_PER_PAGE}
          skip={currentSkip}
          select={SELECT_QUERY}
        />
        <ProductCard data={productsData} />
      </div>
    </section>
  );
}
