import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.instagram.main,
    color: theme.palette.instagram.contrastText,
  },
}));
