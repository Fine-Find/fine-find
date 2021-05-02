import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  box: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    marginTop: '4rem',
    marginBottom: '4rem',
    paddingLeft: theme.spacing(40),
  },
  appBarSpacer: theme.mixins.toolbar,
}));
