import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../hooks/useAuth';
import { useLoginFormStyles } from './LoginForm.styles';

// TODO: Accessibility of the text fields: https://material-ui.com/components/text-fields/
export interface LoginData {
  email: string;
  password: string;
}
const LoginForm: React.FC = () => {
  const styles = useLoginFormStyles();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const auth = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = (data: LoginData) => {
    setError(null);
    return auth.signIn(data).then((response) => {
      response.error ? setError(response.error) : router.push('/dashboard');
    });
  };

  return (
    <Grid container>
      <Box className={styles.formBox}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            error={errors.email ? true : false}
            autoComplete="email"
            {...register('email',{
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={errors.password ? true : false}
            autoComplete="current-password"
            {...register('password',{
              required: 'Please enter a password',
              minLength: {
                value: 6,
                message: 'Should have at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <FormHelperText id="password-text" error>
              {errors.password.message}
            </FormHelperText>
          )}
          {error?.message && (
            <FormHelperText id="form-error-text" error>
              {errors.message}
            </FormHelperText>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submitButton}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Grid>
  );
};
export default LoginForm;
