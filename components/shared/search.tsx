import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  isPrefetch: boolean;
};

export default function Search({
  limit,
  skip,
  select,
  isPrefetch,
}: SearchProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const ref = React.useRef<React.ElementRef<'input'>>(null);
  if (isPrefetch && params.size === 0) {
    ref.current!.value = '';
  }

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    params.set('page', '1');

    e.preventDefault();

    dispatch(resetPage());
    dispatch(resetSkip());

    if (ref.current?.value) {
      params.set('query', ref.current.value);
    } else {
      params.delete('query');
    }

    router.replace(`${pathname}?${params.toString()}`);
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
            placeholder="Cari produk"
            ref={ref}
          />
          <Button type="submit">Terapkan</Button>
        </div>
      </div>
    </form>
  );
}
