import DashboardLayout from '@/components/DashboardLayout';
import { TitledImageCard } from '@/components/shared/TitledImageCard';
import { useLoadInstagramMedia } from '@/hooks/useLoadInstragramMedia';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { CircularProgress, Container, GridListTile } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './collections.module.scss';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

// TODO: Navigating to the page takes some time due to the facebook API call and loading all of the images. How can we improve this performance?
const CollectionsPage: React.FC = () => {
  const auth = useRequireAuth();
  const { isLoading, instagramMediaList, hasNextPage, error, loadMore } =
    useLoadInstagramMedia();

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    // TODO: Get this working properly so that the images load prior to the intersection event occurring
    rootMargin: '0px 0px 400px 0px',
  });

  const CircularLoader = (columns: number) => {
    return (
      <GridListTile
        key="loader"
        cols={columns}
        className={styles.circularLoader}
        ref={infiniteRef}
      >
        <div className={styles.centerCircleLoader}>
          <CircularProgress color="inherit" />
        </div>
      </GridListTile>
    );
  };

  if (!auth.isInitialized || !auth.user) return <>{Loading()}</>;

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          <h2>Your Collections</h2>
          <Grid
            container
            spacing={3}
            className={`${styles.container} ${styles.headerContainer}`}
          >
            {instagramMediaList == null && isLoading && CircularLoader(4)}
            {instagramMediaList &&
              instagramMediaList.map((instagramData) => {
                return (
                  <Grid item xs={12} md={3} lg={3} key={instagramData.id}>
                    <TitledImageCard
                      className={styles.card}
                      title={`Collection`}
                      subTitle="Lorem ipsum dolar sit amet, conseceteur."
                      imgSrc={instagramData.media_url}
                      alt={instagramData.caption || instagramData.id}
                    />
                  </Grid>
                );
              })}
            {/* 
              As long as we have a "next page", we show "Loading" right under the list.
              When it becomes visible on the screen, or it comes near, it triggers 'onLoadMore'.
              This is our "sentry".
              We can also use another "sentry" which is separated from the "Loading" component like:
                <div ref={infiniteRef} />
                {loading && <ListItem>Loading...</ListItem>}
              and leave "Loading" without this ref.
          */}
            {hasNextPage && CircularLoader(1)}
          </Grid>
        </Container>
      </div>
    </DashboardLayout>
  );
};
export default CollectionsPage;
