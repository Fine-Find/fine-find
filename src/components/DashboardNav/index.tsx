import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { useStyles } from './DashboardNav.styles';
import { mainListItems, secondaryListItems } from './listItems';

type Props = {
  toggleDrawer;
  open: boolean;
};

// TODO: Convert this to a responsive Drawer that changes based on media queries https://material-ui.com/components/drawers/#responsive-drawer
// TODO: Update the navigation with true links
export default function DashboardNav({ toggleDrawer, open }: Props) {
  const classes = useStyles();

  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: `${classes.drawerPaper} ${!open && classes.drawerPaperClose}`,
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    </>
  );
}
