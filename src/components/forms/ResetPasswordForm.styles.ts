import makeStyles from '@material-ui/core/styles/makeStyles';

export const useResetPasswordFormStyles = makeStyles(() => ({
  formBox: {
    marginTop: '1em',
    width: '100%',
  },
  submitButton: {
    marginTop: '3em',
    marginBottom: '2em',
  },
  resetGrid: {
    justifyContent: 'flex-end',
  },
}));
