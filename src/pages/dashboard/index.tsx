import { fineFindApis } from '@/utils/urls';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSession } from 'next-auth/client';
import React, { useEffect } from 'react';
import { CreateInstagramAccountRequest } from 'types/Instagram/client/CreateInstagramAccountRequest';

import DashboardLayout from '../../components/DashboardLayout';
import InstagramLoginButton from '../../components/Instagram/InstagramLoginButton';
import MasonGridList from '../../components/MasonGridList';
import { useRequireAuth } from '../../hooks/useRequireAuth';
import styles from './dashboard.module.scss';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

async function postInstagramAccount(session, userIdToken) {
  const body: CreateInstagramAccountRequest = {
    iat: session.instagramIat,
    exp: session.instagramExp,
    access_token: session.accessToken,
    token_type: 'bearer',
    expires_in: session.expiresIn,
    id: '1',
    username: session.user.name,
    accountType: 'PERSONAL',
  };

  await fetch(fineFindApis.createInstagramAccount, {
    method: 'POST',
    headers: {
      authorization: `bearer ${userIdToken}`,
    },
    body: JSON.stringify(body),
  });
}

// TODO: Re-enable instagram by un-commenting out code
function isInstagramStored(auth) {
  return (
    auth && auth.user //&& auth.user.instagram && auth.user.instagram.access_token
  );
}

// TODO: Re-enable instagram by un-commenting out code
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isLoggedIntoInstagram(session) {
  // return session && session.accessToken;
  return true;
}

function displayGrid(session, auth) {
  if (isInstagramStored(auth) || isLoggedIntoInstagram(session)) {
    return <MasonGridList />;
  }
  return <> </>;
}

function displayInstagramLogin(session, auth) {
  if (!isInstagramStored(auth) || !isLoggedIntoInstagram(session)) {
    return <InstagramLoginButton />;
  }

  return <> </>;
}

// TODO: Navigating to the page takes some time due to the facebook API call and loading all of the images. How can we improve this performance?
const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth();

  const [session, loading] = useSession();

  useEffect(() => {
    if (
      auth.isInitialized &&
      !loading &&
      session &&
      session.accessToken &&
      auth.user &&
      !auth.user.instagram &&
      !auth.user.refreshToken
    ) {
      postInstagramAccount(session, auth.userIdToken);
    }
  }, [session, auth]);

  if (!auth.isInitialized || !auth.user || loading) return <>{Loading()}</>;

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
              Welcome to the Fine Find
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {displayInstagramLogin(session, auth)}
          </Grid>
        </Grid>
        {displayGrid(session, auth)}
      </div>
    </DashboardLayout>
  );
};
export default DashBoardPage;
