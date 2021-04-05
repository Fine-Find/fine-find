import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'column',
  },
  headerContainer: {
    alignItems: 'center',
    justify: 'center',
  },
  appBarSpacer: theme.mixins.toolbar,
}));
