import Link from 'next/link';

import { buttonVariants } from '../ui/button';
import Icons from './icons';

export default function Header() {
  return (
    <header>
      <div className="wrapper flex items-center justify-between">
        <Link
          className="font-semibold"
          href="/"
        >
          E-Commerce
        </Link>
        <Link
          className={buttonVariants({ variant: 'ghost' })}
          href="/cart"
        >
          <Icons.shoppingCart />
        </Link>
      </div>
    </header>
  );
}
