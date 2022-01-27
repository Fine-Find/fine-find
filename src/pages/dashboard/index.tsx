import { CreateCollectionButton } from '@/components/Collection/CreateCollectionButton';
import { TitledImageCard } from '@/components/shared/TitledImageCard';
import { BusinessProfileType } from '@/types/profile.types';
import { getProfileData } from '@/utils/firebaseFirestore';
import { fineFindApis } from '@/utils/urls';
import { Card, CardHeader, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CreateInstagramAccountRequest } from 'types/Instagram/client/CreateInstagramAccountRequest';

import CollectionMasonGridList from '../../components/CollectionMasonGridList';
import DashboardLayout from '../../components/DashboardLayout';
import InstagramLoginButton from '../../components/Instagram/InstagramLoginButton';
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

function displayInstagramLogin(session, auth) {
  if (!isInstagramStored(auth) || !isLoggedIntoInstagram(session)) {
    return <InstagramLoginButton />;
  }

  return <> </>;
}

// TODO: Navigating to the page takes some time due to the facebook API call and loading all of the images. How can we improve this performance?
const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth();
  const router = useRouter();
  const [session, loading] = useSession();

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfileType>();
  const [businessImage, setBusinessImage] = useState();

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

  useEffect(() => {
    (async () => {
      setLoadingProfile(true);
      const profiles = await getProfileData(auth?.user.uid);
      setBusinessProfile(profiles.businessProfile);
      setBusinessImage(profiles.businessImage);
      setLoadingProfile(false);
    })();
  }, [auth]);

  if (!auth.isInitialized || !auth.user || loading || loadingProfile)
    return <>{Loading()}</>;

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          <CreateCollectionButton className={styles.createButton} />
          <Grid
            container
            spacing={3}
            className={`${styles.container} ${styles.headerContainer}`}
          >
            <Grid item xs={12}>
              {displayInstagramLogin(session, auth)}
            </Grid>
            <Grid container className={`${styles.moodRow}`} spacing={3}>
              <Grid item md={4} xs={12} className={`${styles.moodRow}`}>
                <TitledImageCard
                  title={businessProfile?.companyName}
                  subTitle={businessProfile?.description}
                  buttonText="Update your profile"
                  imgSrc={businessImage}
                  className={`${styles.moodRow} ${styles.profile}`}
                  onClick={() => {
                    router.push('/dashboard/profile');
                  }}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <Card elevation={0}>
                  <CardHeader title="Your Latest Collections" />
                  <CollectionMasonGridList />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </DashboardLayout>
  );
};
export default DashBoardPage;
