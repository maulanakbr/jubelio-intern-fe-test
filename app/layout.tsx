import '../styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/shared/header';
import Providers from '@/components/shared/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce',
  description: 'Created by Maulana Akbar Yudistika',
};

export default function RootLayout({
  children,
  cartDialog,
}: Readonly<{
  children: React.ReactNode;
  cartDialog: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>
            {children}
            {cartDialog}
          </main>
        </Providers>
      </body>
    </html>
  );
}
