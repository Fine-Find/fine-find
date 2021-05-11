import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  gridList: {
    overflow: 'hidden', // prevent a scroll bar from appearing on the hover
  },
  loading: {
    textAlign: 'center',
  },
  masonic: {
    padding: '8px',
    margin: '0 auto 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  centerCircleLoader: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  circularLoader: {
    display: 'flex',
    color: theme.palette.instagram.main,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    //width: '100%',
    //display: 'block',
  },
  container: {
    minHeight: '100vh',
    width: '100%',
  },
}));
