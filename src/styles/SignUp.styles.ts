import makeStyles from '@material-ui/core/styles/makeStyles';

export const useSignUpStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  box: {
    marginTop: '8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  signUpBox: {
    width: '100%', // Fix IE11 issue.
    marginTop: '3rem',
  },
  avatar: {
    margin: '1rem',
    backgroundColor: theme.palette.secondary.main,
  },
  copyright: {
    marginTop: '2rem',
  },
}));
