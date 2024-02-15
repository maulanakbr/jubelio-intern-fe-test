'use client';

import * as React from 'react';

import { Button } from '../ui/button';

type PaginationProps = {
  currentPage: number;
  limit: number;
  totalItems: number | null;
  handleClick(btnType: 'next' | 'prev'): void;
};

const Pagination = ({
  currentPage,
  limit,
  totalItems,
  handleClick,
}: PaginationProps) => {
  const getMaximumPage = (total: number, limit: number) => {
    const result = Math.ceil(total / limit);

    if (result === 0) return 1;
    return result;
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        onClick={() => handleClick('prev')}
        disabled={currentPage === 1 ? true : false}
      >
        Prev
      </Button>
      <p className="text-sm text-slate-400">
        {currentPage} / {getMaximumPage(totalItems!, limit)}
      </p>
      <Button
        variant="outline"
        onClick={() => handleClick('next')}
        disabled={
          currentPage === getMaximumPage(totalItems!, limit) ? true : false
        }
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
