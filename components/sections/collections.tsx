import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { LIMIT_PER_PAGE } from '@/lib';
import {
  addPage,
  addSkip,
  substractPage,
  substractSkip,
} from '@/redux/slices/productSlice';

import Pagination from '../shared/pagination';
import ProductCard from '../shared/product-card';

export default function Collections() {
  const dispatch = useAppDispatch();
  const {
    products: productsData,
    total: totalItems,
    currentPage,
    isLoading,
  } = useAppSelector(state => state.products);

  const handlePagination = React.useCallback(
    (btnType: 'next' | 'prev') => {
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
    },
    [dispatch],
  );

  return (
    <section className="flex w-full flex-col">
      <ProductCard
        data={productsData}
        loading={isLoading}
      />
      <Pagination
        currentPage={currentPage}
        limit={LIMIT_PER_PAGE}
        totalItems={totalItems}
        handleClick={handlePagination}
      />
    </section>
  );
}
