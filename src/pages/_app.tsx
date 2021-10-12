import '../styles/styles.scss';

import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';

import { AuthProvider } from '../hooks/useAuth';
import { theme } from '../styles/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
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
        <StylesProvider injectFirst>
          <ThemeProvider theme={createTheme(theme)}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Provider session={pageProps.session}>
              <Component {...pageProps} />
            </Provider>
          </ThemeProvider>
        </StylesProvider>
      </AuthProvider>
    </>
  );
}
