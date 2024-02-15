import Link from 'next/link';
import * as React from 'react';

import ThemeToggle from '../shared/theme-toggle';

export default function Footer() {
  return (
    <footer className="bg-tertiary">
      <div className="wrapper flex flex-col-reverse items-center justify-between md:flex-row">
        <div className="flex items-center justify-center gap-1">
          <p className="text-sm font-semibold">Developed</p>
          <p className="text-center text-sm leading-loose text-muted-foreground">
            by{' '}
            <Link
              className="underline underline-offset-4"
              href="https://www.linkedin.com/in/maulanakbr/"
              target="_blank"
              rel="norefferer"
            >
              Maulana Akbar Yudistika
            </Link>
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
}
