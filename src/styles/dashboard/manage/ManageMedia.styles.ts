import makeStyles from '@material-ui/core/styles/makeStyles';

export const manageMediaStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row',
  },
  headerContainer: {
    //alignItems: 'center',
    justifyContent: 'center',
  },
  instagramInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  instagramImage: {
    objectFit: 'contain',
    //width: '100%',
    maxHeight: '75vh',
  },
  appBarSpacer: theme.mixins.toolbar,
  paperRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  selectProductList: {
    width: '100%',
    marginTop: '5rem',
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  image: {
    width: '30px',
    objectFit: 'cover',
    paddingRight: '5px',
    marginRight: '5px',
  },
  iconButton: {
    padding: 10,
  },
}));
