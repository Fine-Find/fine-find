import makeStyles from '@material-ui/core/styles/makeStyles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  appBarTypography: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  appBar: {
    color: theme.palette.primary.main,
    backgroundColor: '#fff',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  button: {
    color: 'white',
  },

  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
}));
