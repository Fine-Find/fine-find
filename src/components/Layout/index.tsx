import Head from 'next/head';
import React, { ReactElement, ReactNode } from 'react';

// import Header from '../Header';
import MarketingHeader from '../MarketingHeader';

type Props = {
  title?: string;
  children: ReactNode;
};

// TODO: Fix this so that the dashboard displays the correct header
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
      <MarketingHeader></MarketingHeader>
      {/* <Header></Header> */}
      <div id="main">{children}</div>
    </>
  );
}
