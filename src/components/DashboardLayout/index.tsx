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
    <div className={styles.root}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>
      <Header onDrawerToggled={toggleDrawer} open={open}></Header>
      <div className={`${styles.wrapper} ${containerStyle}`}>
        <div className={`${styles.container} `}>
          <div className={styles.content}>
            <Box className={styles.box}>
              {children}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
