import "tailwindcss/tailwind.css"
import { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/useAuth';
import React from "react";

export default function MyApp({ Component, pageProps }: AppProps): any {
  return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
  );
}