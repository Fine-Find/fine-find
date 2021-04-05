import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../hooks/useAuth';
import { useResetPasswordFormStyles } from './ResetPasswordForm.styles';

const ResetPasswordForm: React.FC = () => {
  const styles = useResetPasswordFormStyles();
  const { register, errors, handleSubmit } = useForm();
  const auth = useAuth();
  const router = useRouter();
  const onSubmit = (data: { email: string }) => {
    auth.sendPasswordResetEmail(data.email);
    router.push('/login');
  };
  return (
    <Box className={styles.formBox}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={errors.email ? true : false}
              inputRef={register({
                required: 'Please enter an email',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Not a valid email',
                },
              })}
            />
            {errors.email && (
              <FormHelperText id="email-text" error>
                {errors.email.message}
              </FormHelperText>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submitButton}
          >
            Send reset link
          </Button>
        </Grid>
      </form>
    </Box>
  );
};
export default ResetPasswordForm;
