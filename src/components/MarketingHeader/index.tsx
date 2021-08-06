import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { useAuth } from '../../hooks/useAuth';
import { Button } from '../shared/OutlineButton';
import styles from './MarketingHeader.module.scss';

export default function MarketingHeader() {
  const router = useRouter();
  const auth = useAuth();

  let button = null;
  if (auth.isInitialized) {
    button = !auth.user ? (
      <Button
        label="APPLY NOW"
        onClick={() => router.push('/login')}
        width="9%"
      />
    ) : (
      <Button
        label="Sign Out"
        onClick={() => {
          auth.signOut();
          router.push('/login');
        }}
      />
    );
  }

  return (
    <>
      <AppBar position="absolute" className={styles.appBar} elevation={0}>
        <Toolbar className={styles.toolbar}>
          <Link href="/">
            <a>
              <Image src="/main_navy.png" width={125} height={25} />
            </a>
          </Link>
          <Typography className={styles.appBarTypography}> </Typography>

          <Link href="/">
            <a className={styles.link}>HOME</a>
          </Link>

          <Link href="/designers">
            <a className={styles.link}>DESIGNERS</a>
          </Link>

          <Link href="/process">
            <a className={styles.link}>THE PROCESS</a>
          </Link>
          {button}
        </Toolbar>
      </AppBar>
    </>
  );
}
