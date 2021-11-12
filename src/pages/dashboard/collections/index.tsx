import { CreateCollectionButton } from '@/components/Collection/CreateCollectionButton';
import DashboardLayout from '@/components/DashboardLayout';
import { TitledImageCard } from '@/components/shared/TitledImageCard';
import { useLoadCollection } from '@/hooks/useLoadCollections';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { fineFindPages } from '@/utils/urls';
import { CircularProgress, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router';
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

// TODO: Navigating to the page takes some time due to the firebase apis and loading all of the images. How can we improve this performance?
// Could we use blurred images to improve the look and feel?
// TODO: Consolidate this page with the CollectionMasonGridList component
const CollectionsPage: React.FC = () => {
  const auth = useRequireAuth();
  const router = useRouter();
  const { isLoading, collectionList, hasMoreDocuments, error, loadMore } =
    useLoadCollection(auth.user?.uid);

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMoreDocuments,
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

  const CircularLoader = () => {
    return (
      <div key="loader" className={styles.circularLoader} ref={infiniteRef}>
        <div className={styles.centerCircleLoader}>
          <CircularProgress color="inherit" />
        </div>
      </div>
    );
  };

  if (!auth.isInitialized || !auth.user) return <>{Loading()}</>;

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          <CreateCollectionButton className={styles.createButton} />
          <h2>Your Collections</h2>
          <Grid
            container
            spacing={3}
            className={`${styles.container} ${styles.headerContainer}`}
          >
            {collectionList === null && isLoading && CircularLoader()}
            {collectionList &&
              collectionList.map((document) => {
                return (
                  <Grid item xs={12} md={3} lg={3} key={document.get('id')}>
                    <TitledImageCard
                      className={styles.card}
                      title={document.get('title')}
                      subTitle={document.get('description')}
                      imgSrc={document.get('src')}
                      alt={document.get('title')}
                      onClick={() => {
                        const manageMediaUri = `${fineFindPages.manageMedia}/${document.id}`;
                        router.push(manageMediaUri);
                      }}
                      buttonText="View Collection"
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

            {hasMoreDocuments && (
              <Grid item xs={12} md={3} lg={3}>
                {CircularLoader()}
              </Grid>
            )}
          </Grid>
        </Container>
      </div>
    </DashboardLayout>
  );
};
export default CollectionsPage;
