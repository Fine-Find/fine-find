import Head from 'next/head';
import React, { ReactElement, ReactNode } from 'react';

import Header from '../Header';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout({
  title = 'The FineFind | Designers',
  children,
}: Props): ReactElement {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>
      <Header></Header>
      <div id="main">{children}</div>
    </>
  );
}
