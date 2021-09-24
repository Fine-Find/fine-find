import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
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
    <ListItem button className={`${styles.item} ${styles.itemEnd}`}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <Link href={fineFindPages.manageProfile}>
        <a>
          <ListItemText primary="Profile" />
        </a>
      </Link>
    </ListItem>
  </div>
);
