import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import DashboardNav from '../DashboardNav';
import styles from './Header.module.scss';

export interface HeaderProps {
  title?: string;
  drawer?: boolean;
}

export default function Header({
  title = 'The FineFind',
  drawer = false,
}: HeaderProps) {
  const router = useRouter();
  const auth = useAuth();

  const [open, setOpen] = useState(drawer);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
          auth.signOut();
          router.push('/login');
        }}
      >
        Sign Out
      </Button>
    );
  }

  const appBarStyle = drawer && open ? styles.appBarShift : '';
  const menuButtonStyle = `${styles.menuButton} ${
    open && styles.menuButtonHidden
  }`;

  return (
    <>
      <AppBar position="absolute" className={`${styles.appBar} ${appBarStyle}`}>
        <Toolbar className={styles.toolbar}>
          {MenuDrawer(drawer, toggleDrawer, menuButtonStyle)}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={styles.appBarTypography}
          >
            {title}
          </Typography>
          {button}
        </Toolbar>
      </AppBar>
      {drawer && (
        <DashboardNav open={open} toggleDrawer={toggleDrawer}></DashboardNav>
      )}
    </>
  );
}

function MenuDrawer(drawer: boolean, toggleDrawer, menuButtonStyle) {
  if (!drawer) {
    return null;
  }

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
