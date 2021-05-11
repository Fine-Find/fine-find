import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import React, { ReactElement, ReactNode } from 'react';

import Header from '../Header';
import { useStyles } from './DashboardLayout.styles';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout({
  title = 'The FineFind | Designers',
  children,
}: Props): ReactElement {
  const styles = useStyles();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>
      <Header drawer={true}></Header>
      <Box component="main" className={styles.box}>
        <div className={styles.appBarSpacer} />
        <Container maxWidth="xl" className={styles.container}>
          {children}
        </Container>
      </Box>
    </>
  );
}
