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

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
// import Button as MUIButton from '@material-ui/core/Button';

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
      <Button
        label="APPLY NOW"
        onClick={() => router.push('/login')}
        // width="9%"
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
        <Toolbar className={`${styles.toolbar} topnav`} id='myTopnav'>
          <Link href="/">
            <a>
              <Image src="/main_navy.png" width={100} height={25} />
            </a>
          </Link>
          <Typography className={styles.appBarTypography}> </Typography>

        <div className={styles.bigNavBar}>
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
        </div>
          
        <div className={styles.hamburgerNavBar}>
            <button aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => handleClick(e)}>
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
                <Link href="/designers">
                  <a className={styles.link}>DESIGNERS</a>
                </Link>
             </MenuItem>
             <MenuItem onClick={handleClose}>
                <Link href="/process">
                  <a className={styles.link}>THE PROCESS</a>
                </Link>
             </MenuItem>
             <MenuItem onClick={handleClose}>{button}</MenuItem>

           </Menu>
        </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
