import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import styles from './DashboardNav.module.scss';
import { mainListItems } from './listItems';

type Props = {
  toggleDrawer;
  open: boolean;
};

// TODO: Convert this to a responsive Drawer that changes based on media queries https://material-ui.com/components/drawers/#responsive-drawer
// TODO: Update the navigation with true links
export default function DashboardNav({ toggleDrawer, open }: Props) {
  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: `${styles.drawerPaper} ${!open && styles.drawerPaperClose}`,
        }}
        open={open}
      >
        <div className={styles.toolbarIcon}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
    </>
  );
}
