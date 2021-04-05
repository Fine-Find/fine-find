import '../styles/styles.scss';

import { defineCustomElements as ionDefineCustomElements } from '@ionic/core/loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';

import { AuthProvider } from '../hooks/useAuth';
import theme from '../styles/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // TODO: Drop this when we remove ion
    ionDefineCustomElements(window);

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <ion-app>
            <Component {...pageProps} />
          </ion-app>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
