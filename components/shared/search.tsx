import { useRouter } from 'next/navigation';
import React from 'react';

import { useAppDispatch } from '@/hooks/useRedux';
import { getProductsBySearch } from '@/redux/slices/productSlice';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

type SearchProps = {
  limit: number;
  skip: number;
  select: string;
};

export default function Search({ limit, skip, select }: SearchProps) {
  const router = useRouter();

  const ref = React.useRef<React.ElementRef<'input'>>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push(`?q=${ref.current?.value}`, { scroll: false });
  };

  React.useEffect(() => {
    dispatch(
      getProductsBySearch({
        query: ref.current?.value as string,
        limit,
        skip,
        select,
      }),
    );
  }, [skip, ref.current?.value]);

  return (
    <form
      className="mb-4"
      onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}
    >
      <div className="flex gap-4">
        <Input
          type="search"
          placeholder="Search your product"
          ref={ref}
        />
        <Button type="submit">Terapkan</Button>
      </div>
    </form>
  );
}
