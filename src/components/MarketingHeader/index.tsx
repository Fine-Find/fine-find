import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let button = null;
  if (auth.isInitialized) {
    button = !auth.user ? (
      <Button label="APPLY NOW" onClick={() => router.push('/login')} />
    ) : (
      <Button
        label="Sign Out"
        onClick={() => {
          auth.firestoreSignOut();
          router.push('/login');
        }}
      />
    );
  }

  return (
    <>
      <AppBar position="absolute" className={styles.appBar} elevation={0}>
        <Toolbar className={`${styles.toolbar} topnav`} id="myTopnav">
          <Link href="/">
            <a className={styles.logos}>
              <Image className={styles.image}
                src="/main_navy.png"
                layout="fill"
                objectFit="contain"
              />
            </a>
          </Link>
          <Typography className={styles.appBarTypography}> </Typography>

          <div className={styles.bigNavBar}>
            <Link href="/">
              <a className={styles.link}>HOME</a>
            </Link>

            <Link href="/faq">
              <a className={styles.link}>FAQ</a>
            </Link>
            {button}
          </div>
          <div className={styles.hamburgerNavBar}>
            <button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(e) => handleClick(e)}
            >
              <MenuIcon />
            </button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link href="/">
                  <a className={styles.link}>HOME</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/faq">
                  <a className={styles.link}>FAQ</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/signup">
                  <a className={styles.link}>APPLY NOW</a>
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
