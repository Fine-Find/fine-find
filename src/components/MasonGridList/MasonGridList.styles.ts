import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  gridList: {
    overflow: 'visible',
  },
  loading: {
    textAlign: 'center',
  },
  masonic: {
    padding: '8px',
    width: '100%',
    //maxWidth: '960px',
    margin: '0 auto 0',
    boxSizing: 'border-box',
  },
  card: {
    transition: 'transform 300ms ease-in-out',
    '&:hover': {
      position: 'relative',
      background: '#f2fafe',
      transform: 'scale(1.125)',
      zIndex: '1000',
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
  },
  img: {
    width: '100%',
    display: 'block',
  },
  container: {
    minHeight: '100vh',
    width: '100%',
  },
}));
