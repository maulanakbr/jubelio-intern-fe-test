'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from '@/redux/store';

export default function Providers({ children, ...props }: ThemeProviderProps) {
  const persistor = persistStore(store);

  return (
    <NextThemesProvider {...props}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>{children}</PersistGate>
      </Provider>
    </NextThemesProvider>
  );
}
