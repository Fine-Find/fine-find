import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EditIcon from '@material-ui/icons/Edit';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Link from 'next/link';
import React from 'react';

import { fineFindPages } from '../../utils/urls';
import styles from './ListItems.module.scss';

export const mainListItems = (
  <div className={styles.container}>
    <ListItem button className={styles.item}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link href={fineFindPages.dashboard}>
        <a>
          <ListItemText primary="Dashboard" />
        </a>
      </Link>
    </ListItem>
    <ListItem button className={styles.item}>
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <Link href={fineFindPages.collections}>
        <a>
          <ListItemText primary="Collections" />
        </a>
      </Link>
    </ListItem>
    <ListItem button className={styles.item}>
      <ListItemIcon>
        <MenuBookIcon />
      </ListItemIcon>
      <Link href={fineFindPages.products}>
        <a>
          <ListItemText primary="Products" />
        </a>
      </Link>
    </ListItem>
    <ListItem button className={styles.item}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <Link href={fineFindPages.orders}>
        <a>
          <ListItemText primary="Orders" />
        </a>
      </Link>
    </ListItem>
    <ListItem button className={`${styles.item} ${styles.itemEnd}`}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <Link href={fineFindPages.manageProfile}>
        <a>
          <ListItemText primary="Profile" />
        </a>
      </Link>
    </ListItem>
  </div>
);
