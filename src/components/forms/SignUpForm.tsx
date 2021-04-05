import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../hooks/useAuth';
import { useSignUpFormStyles } from './SignUpForm.styles';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const styles = useSignUpFormStyles();
  const { register, errors, handleSubmit } = useForm();
  const auth = useAuth();
  const router = useRouter();
  const onSubmit = (data: SignUpData) => {
    return auth.signUp(data).then((user) => {
      // eslint-disable-next-line no-console
      console.log(user);
      router.push('/dashboard');
    });
  };
  return (
    <Box className={styles.formBox}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              error={errors.name ? true : false}
              inputRef={register({
                required: 'Please enter an name',
              })}
            />
            {errors.name && (
              <FormHelperText id="name-text" error>
                {errors.name.message}
              </FormHelperText>
            )}
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password ? true : false}
              inputRef={register({
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
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={styles.submitButton}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
};
export default SignUpForm;
