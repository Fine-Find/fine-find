import Head from 'next/head';
import React, { ReactElement, ReactNode } from 'react';

import Header from '../Header';

type Props = {
  title?: string;
  children: ReactNode;
};

// TODO: Convert the ion-item list to something that takes up less space
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
      <ion-content>
        <div id="main">{children}</div>
      </ion-content>
    </>
  );
}
