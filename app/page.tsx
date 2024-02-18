'use client';

import * as React from 'react';

import Collections from '@/components/sections/collections';
import NotFound from '@/components/shared/not-found';
import Search from '@/components/shared/search';
import { useAppSelector } from '@/hooks/useRedux';
import { LIMIT_PER_PAGE, SELECT_QUERY } from '@/lib';

export default function Home() {
  const [prefetch, setPrefetch] = React.useState(false);

  const {
    products: productsData,
    currentSkip,
    total,
  } = useAppSelector(state => state.products);

  React.useEffect(() => {
    setPrefetch(true);
  }, [total]);

  return (
    <section className="wrapper">
      <h2 className="mb-4 text-[1.3rem] font-semibold">Produk</h2>
      <hr className="mb-8" />
      <div className="mb-3 flex w-full flex-col justify-between lg:flex-row lg:gap-10">
        <Search
          limit={LIMIT_PER_PAGE}
          skip={currentSkip}
          select={SELECT_QUERY}
          isPrefetch={prefetch}
        />
        {productsData?.length === 0 ? <NotFound /> : <Collections />}
      </div>
    </section>
  );
}
