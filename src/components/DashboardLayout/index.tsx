import Box from '@material-ui/core/Box';
import Head from 'next/head';
import React, { ReactElement, ReactNode, useState } from 'react';

import Header from '../Header';
import styles from './DashboardLayout.module.scss';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout({
  title = 'The FineFind | Designers',
  children,
}: Props): ReactElement {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const containerStyle = open ? styles.open : styles.closed;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>
      <Header onDrawerToggled={toggleDrawer} open={open}></Header>
      <Box component="main" className={styles.box}>
        <div className={styles.wrapper}>
          <div className={`${styles.container} ${containerStyle}`}>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </Box>
    </>
  );
}
