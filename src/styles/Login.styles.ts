import makeStyles from '@material-ui/core/styles/makeStyles';

export const useLoginStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  loginBox: {
    margin: `8rem 4rem`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: '1rem',
    backgroundColor: theme.palette.secondary.main,
  },
  copyright: {
    marginTop: '2rem',
  },
}));
