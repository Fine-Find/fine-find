import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSession } from 'next-auth/client';

import DashboardLayout from '../components/DashboardLayout';
import InstagramLoginButton from '../components/Instagram/InstagramLoginButton';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useStyles } from '../styles/Dashboard.styles';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

const DashBoardPage: React.FC = () => {
  const styles = useStyles();
  const auth = useRequireAuth();

  const [session, loading] = useSession();

  if (!auth.isInitialized || loading) return <>{Loading()}</>;

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Grid
          container
          spacing={1}
          className={`${styles.container} ${styles.headerContainer}`}
        >
          <Grid item xs={12}>
            <Typography component="h2" variant="h2">
              {`Welcome ${auth.user.name}!`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <p>{`You are logged in with ${auth.user.email}`}</p>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={() => auth.signOut()}>
              Sign out
            </Button>
          </Grid>
          <Grid item xs={12}>
            {session && session.accessToken ? (
              <p>Connected to {session.user.name}'s Instagram account</p>
            ) : (
              <InstagramLoginButton />
            )}
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
};
export default DashBoardPage;
