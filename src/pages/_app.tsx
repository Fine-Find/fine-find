import 'tailwindcss/tailwind.css';

import '../styles/styles.scss';

import { defineCustomElements as ionDefineCustomElements } from '@ionic/core/loader';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';

import { AuthProvider } from '../hooks/useAuth';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ionDefineCustomElements(window);
  });

  return (
    <AuthProvider>
      <ion-app>
        <Component {...pageProps} />
      </ion-app>
    </AuthProvider>
  );
}
