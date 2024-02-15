import Link from 'next/link';

import Icons from './icons';

export default function NotFound() {
  return (
    <div className="flex min-h-[30rem] w-full flex-col items-center justify-center">
      <Icons.search
        className="text-zinc-200"
        width={120}
        height={120}
      />
      <h1 className="text-balance text-center text-6xl font-medium leading-loose">
        Not Found
      </h1>
      <Link
        className="text-sm"
        href="/"
      >
        back to home
      </Link>
    </div>
  );
}
