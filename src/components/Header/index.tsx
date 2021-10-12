import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { useAuth } from '../../hooks/useAuth';
import DashboardNav from '../DashboardNav';
import styles from './Header.module.scss';

export interface HeaderProps {
  open: boolean;
  onDrawerToggled: () => void;
}

// TODO: Refactor to support true responsive design. On mobile the side drawer should be hidden
//      and then when opened it appears as an expanded drawer.
export default function Header({ open, onDrawerToggled }: HeaderProps) {
  const router = useRouter();
  const auth = useAuth();

  let button = null;
  if (auth.isInitialized) {
    button = !auth.user ? (
      <Button color="inherit" onClick={() => router.push('/login')}>
        Sign In
      </Button>
    ) : (
      <Button
        color="inherit"
        onClick={() => {
          auth.firestoreSignOut();
          router.push('/login');
        }}
      >
        Sign Out
      </Button>
    );
  }

  const appBarStyle = open ? styles.appBarShift : '';
  const menuButtonStyle = `${styles.menuButton} ${
    open && styles.menuButtonHidden
  }`;

  return (
    <>
      <AppBar
        position="absolute"
        className={`${styles.appBar} ${appBarStyle}`}
        elevation={0}
      >
        <Toolbar className={styles.toolbar}>
          {MenuDrawer(onDrawerToggled, menuButtonStyle)}
          <Link href="/dashboard">
            <a>
              <Image src="/main_navy.png" width={100} height={25} />
            </a>
          </Link>
          <Typography className={styles.appBarTypography} />
          {button}
        </Toolbar>
      </AppBar>
      <DashboardNav open={open} toggleDrawer={onDrawerToggled} />
    </>
  );
}

function MenuDrawer(toggleDrawer, menuButtonStyle) {
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
      onClick={toggleDrawer}
      className={menuButtonStyle}
    >
      <MenuIcon />
    </IconButton>
  );
}
