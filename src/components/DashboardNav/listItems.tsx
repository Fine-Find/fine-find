import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EditIcon from '@material-ui/icons/Edit';
import HistoryIcon from '@material-ui/icons/History';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
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

export const adminListItems = (
  <div className={styles.container}>
    <ListItem button className={styles.item}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link href={fineFindPages.admin}>
        <a>
          <ListItemText primary="Dashboard" />
        </a>
      </Link>
    </ListItem>
    <ListItem button className={styles.item}>
      <ListItemIcon>
        <HistoryIcon />
      </ListItemIcon>
      <Link href={fineFindPages.requests}>
        <a>
          <ListItemText primary="Requests" />
        </a>
      </Link>
    </ListItem>
  </div>
);
