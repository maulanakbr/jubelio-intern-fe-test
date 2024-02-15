import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { useAppDispatch } from '@/hooks/useRedux';
import {
  getProductsBySearch,
  resetPage,
  resetSkip,
} from '@/redux/slices/productSlice';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

type SearchProps = {
  limit: number;
  skip: number;
  select: string;
};

export default function Search({ limit, skip, select }: SearchProps) {
  const ref = React.useRef<React.ElementRef<'input'>>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(resetPage());
    dispatch(resetSkip());

    router.push(`?q=${ref.current?.value}`, { scroll: false });
  };

  React.useEffect(() => {
    dispatch(
      getProductsBySearch({
        query: ref.current!.value,
        limit,
        skip,
        select,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, skip, searchParams.toString()]);

  return (
    <form
      className="mb-4 w-full lg:max-w-[18rem]"
      onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}
    >
      <div>
        <label
          className="font-semibold"
          htmlFor="inputForm"
        >
          Pencarian
        </label>
        <div className="flex gap-4 py-2 lg:flex-col">
          <Input
            id="inputForm"
            type="search"
            placeholder="Search your product"
            ref={ref}
          />
          <Button type="submit">Terapkan</Button>
        </div>
      </div>
    </form>
  );
}
