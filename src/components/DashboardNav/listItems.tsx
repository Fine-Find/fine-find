import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import Link from 'next/link';
import React from 'react';
import PersonIcon from '@material-ui/icons/Person';

import { fineFindPages } from '../../utils/urls';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link href={fineFindPages.dashboard}>
        <a>
          <ListItemText primary="Dashboard" />
        </a>
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
  </div>
);
