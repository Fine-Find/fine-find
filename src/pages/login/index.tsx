import Copyright from '@/components/Copyright/Copyright';
import LoginForm from '@/components/forms/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './login.module.scss';

const LoginPage: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();

  if (auth.isInitialized && auth.user && router.isReady) {
    router.push('/dashboard');
  }

  return (
    <Grid container component="main" className={styles.root}>
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <Box className={styles.loginBox}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm />
          <Grid container>
            <Grid item xs>
              <Link href="/reset-password">
                <a>
                  <Typography variant="body2" color="primary">
                    Forgot password?
                  </Typography>
                </a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/apply">
                <a>
                  <Typography variant="body2" color="primary">
                    {"Don't have an account? Apply Now"}
                  </Typography>
                </a>
              </Link>
            </Grid>
          </Grid>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};
export default LoginPage;
