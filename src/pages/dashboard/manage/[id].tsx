/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react';

import DashboardLayout from '../../../components/DashboardLayout';
import InstagramLoginButton from '../../../components/Instagram/InstagramLoginButton';
import { useRequireAuth } from '../../../hooks/useRequireAuth';
import { manageMediaStyles } from '../../../styles/dashboard/manage/ManageMedia.styles';
import { fineFindPages } from '../../../utils/urls';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

// TODO: Refactor how we are handling the query parameters coming back as arrays.
function queryParameterAsString(queryParameter: string | string[]): string {
  return Array.isArray(queryParameter) ? queryParameter[0] : queryParameter;
}

function isInstagramStored(auth) {
  return (
    auth && auth.user && auth.user.instagram && auth.user.instagram.access_token
  );
}

function displayInstagramLogin(auth) {
  if (isInstagramStored(auth)) {
    return (
      <p>Connected to {auth.user.instagram.username}'s Instagram account</p>
    );
  }

  return <InstagramLoginButton />;
}

const DashBoardPage: React.FC = () => {
  const router = useRouter();
  const styles = manageMediaStyles();
  const auth = useRequireAuth();

  if (!auth.isInitialized || !auth.user) return <>{Loading()}</>;

  const {
    id,
    media_url,
    caption,
    timestamp,
    permalink,
    username,
  } = router.query;

  const imageId = queryParameterAsString(id);
  const mediaUrl = queryParameterAsString(media_url);
  const mediaCaption = queryParameterAsString(caption);

  if (!imageId || !mediaUrl) {
    router.push(fineFindPages.dashboard);
    return <>{Loading()}</>;
  }

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Grid
          container
          spacing={1}
          className={`${styles.container} ${styles.headerContainer}`}
        >
          <Grid item xs={12} md={8} className={styles.imageGrid}>
            <img
              src={mediaUrl}
              alt={mediaCaption || imageId}
              className={styles.instagramImage}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper component="form" className={styles.paperRoot}>
              <IconButton
                type="submit"
                className={styles.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                className={styles.input}
                placeholder="Search Fine Find"
                inputProps={{ 'aria-label': 'search fine find' }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} className={styles.instagramInfo}>
            {displayInstagramLogin(auth)}
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
};
export default DashBoardPage;
