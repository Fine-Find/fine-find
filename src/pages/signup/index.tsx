import Copyright from '@/components/Copyright/Copyright';
import SignUpForm from '@/components/forms/SignUpForm';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link';

import styles from './signup.module.scss';
const SignUpPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box className={styles.box}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <SignUpForm />
        <Grid container>
          <Grid item>
            <Link href="/login">
              <a>
                <Typography variant="body2" color="primary">
                  {'Already have an account? Sign in'}
                </Typography>
              </a>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright />
    </Container>
  );
};
export default SignUpPage;
