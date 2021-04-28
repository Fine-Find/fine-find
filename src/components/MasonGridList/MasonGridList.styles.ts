import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  gridList: {
  },
  loading: {
    textAlign: 'center',
  },
  masonic: {
    padding: '8px',
    width: '100%',
    maxWidth: '960px',
    margin: '0 auto 0',
    boxSizing: 'border-box',
  },
  card: {
    display: 'flex',
    // flexDirection: 'column',
    //background: '#1d2326',
    //borderRadius: '1rem',
    // justifyContent: 'center',
    // alignItems: 'center',
    transition: 'transform 100ms ease-in-out',
    // width: '100%',
    // minHeight: '100px',
    'span:last-of-type': {
      color: '#fff',
      padding: '0.5rem',
    },
    '&:hover': {
      position: 'relative',
      background: '#f2fafe',
      transform: 'scale(1.125)',
      zIndex: '1000',
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      'span:last-of-type': {
        color: '#1d2326',
        padding: '0.5rem',
      },
    },
  },
  img: {
    width: '100%',
    display: 'block',
    //borderRadius: '0.5rem',
  },
  container: {
    minHeight: '100vh',
    width: '100%',
  },
}));
