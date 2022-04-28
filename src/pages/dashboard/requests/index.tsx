import DashboardLayout from '@/components/DashboardLayout';
import { ProductsCard } from '@/components/shared/TitleProductCard';
import { useLoadCollection } from '@/hooks/useLoadCollections';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { verifyDesignerDashboard } from '@/utils/roles';
import { CircularProgress, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './requests.module.scss';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

const ReqeustsPage: React.FC = () => {
  const auth = useRequireAuth();
  const router = useRouter();
  const { isLoading, collectionList, hasMoreDocuments, error, loadMore } =
    useLoadCollection(auth.user?.uid);
  const [designer, setDesigner] = useState(false);
  useEffect(() => {
    verifyDesignerDashboard(router, true, setDesigner);
  }, []);
  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMoreDocuments,
    onLoadMore: loadMore,
    disabled: !!error,
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
  const dashboard = (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          <h2>Products requested</h2>
          <Grid
            container
            spacing={3}
            className={`${styles.container} ${styles.headerContainer}`}
          >
            {collectionList === null && isLoading && CircularLoader()}
            {collectionList &&
              collectionList.map((document) => {
                return (
                  <>
                    <ProductsCard
                      productsRequested={
                        document.get('productsRequested').length &&
                        document.get('productsRequested')
                      }
                      className={styles.card}
                      imgSrc={document.get('src')}
                      alt={document.get('title')}
                    />
                  </>
                );
              })}

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

  return <>{designer ? dashboard : Loading()}</>;
};
export default ReqeustsPage;
