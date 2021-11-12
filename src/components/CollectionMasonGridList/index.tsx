/* eslint-disable @next/next/no-img-element */
import { useLoadCollection } from '@/hooks/useLoadCollections';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { fineFindPages } from '@/utils/urls';
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';
import { ImageList, ImageListItem } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridListTile from '@material-ui/core/GridListTile';
import { Skeleton } from '@material-ui/lab';
import { useRouter } from 'next/router';
import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './MasonGridList.module.scss';

const MAX_COLUMNS = 3;

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

// TODO: Consolidate with the collections page. Lot's of duplicate code
export default function CollectionMasonGridList() {
  const auth = useRequireAuth();
  const router = useRouter();
  const { isLoading, collectionList, hasMoreDocuments, error, loadMore } =
    useLoadCollection(auth.user.uid);

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

  const Card = (document: QueryDocumentSnapshot<DocumentData>) => {
    return (
      <ImageListItem
        key={document.id}
        cols={1}
        className={styles.card}
        onClick={() => {
          const manageMediaUri = `${fineFindPages.manageMedia}/${document.id}`;
          router.push(manageMediaUri);
        }}
      >
        <img
          className={styles.img}
          src={document.get('src')}
          alt={document.get('title')}
        />
      </ImageListItem>
    );
  };

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

  // TODO: Need to adjust the height based on the device type?
  return (
    <div className={styles.masonic}>
      <ImageList cols={MAX_COLUMNS} gap={16}>
        {collectionList === null && isLoading && CircularLoader(MAX_COLUMNS)}
        {collectionList && collectionList.map((tile) => Card(tile))}
        {/* 
              As long as we have a "next page", we show "Loading" right under the list.
              When it becomes visible on the screen, or it comes near, it triggers 'onLoadMore'.
              This is our "sentry".
              We can also use another "sentry" which is separated from the "Loading" component like:
                <div ref={infiniteRef} />
                {loading && <ListItem>Loading...</ListItem>}
              and leave "Loading" without this ref.
          */}
        {hasMoreDocuments && CircularLoader(1)}
      </ImageList>
    </div>
  );
}
