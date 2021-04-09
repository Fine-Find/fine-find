import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link';

import Copyright from '../components/Copyright/Copyright';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import { useResetPasswordStyles } from '../styles/ResetPassword.styles';

const ResetPasswordPage: React.FC = () => {
  const styles = useResetPasswordStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Box className={styles.box}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <ResetPasswordForm />
        <Grid container>
          <Grid item>
            <Link href="/login">
              <a>
                <Typography variant="body2" color="primary">
                  {`Didn't forget? Sign in`}
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
export default ResetPasswordPage;
