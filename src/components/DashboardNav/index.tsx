import { verifyDesignerDashboard } from '@/utils/roles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useEffect, useState } from 'react';

import styles from './DashboardNav.module.scss';
import { adminListItems, mainListItems } from './listItems';

type Props = {
  toggleDrawer;
  open: boolean;
  shopifyLink?: string;
};

export default function DashboardNav({
  toggleDrawer,
  open,
  shopifyLink,
}: Props) {
  const [designer, setDesigner] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    verifyDesignerDashboard(null, false, setDesigner);
  });

  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: `${styles.drawerPaper} ${!open && styles.drawerPaperClose}`,
        }}
        open={open}
        PaperProps={{ elevation: 0 }}
      >
        <div className={styles.toolbarIcon}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className={styles.list}>
          {designer
            ? mainListItems(shopifyLink, copy, setCopy)
            : adminListItems}
        </List>
      </Drawer>
    </>
  );
}
