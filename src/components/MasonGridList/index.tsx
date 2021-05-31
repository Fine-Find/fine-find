import { fineFindPages } from '@/utils/urls';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useLoadInstagramMedia } from 'hooks/useLoadInstragramMedia';
import { useRouter } from 'next/router';
import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { InstagramMedia } from 'types/Instagram/InstagramMedia';

import { useStyles } from './MasonGridList.styles';

const MAX_COLUMNS = 3;

export default function MasonGridList() {
  const router = useRouter();
  const {
    isLoading,
    instagramMediaList,
    hasNextPage,
    error,
    loadMore,
  } = useLoadInstagramMedia();

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

  const styles = useStyles();

  const Card = (instagramData: InstagramMedia) => {
    return (
      <GridListTile
        key={instagramData.id}
        cols={1}
        className={styles.card}
        onClick={() => {
          const cardQueryParameters = new URLSearchParams({
            media_url: instagramData.media_url,
            media_type: instagramData.media_type,
            caption: instagramData.caption,
            permalink: instagramData.permalink,
            timestamp: instagramData.timestamp,
          });
          const manageMediaUri = `${fineFindPages.manageMedia}/${instagramData.id}?${cardQueryParameters}`;

          router.push(manageMediaUri);
        }}
      >
        <img
          className={styles.img}
          src={instagramData.media_url}
          alt={instagramData.caption || instagramData.id}
        />
      </GridListTile>
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

  // TODO: Need to adjust the height based on the device type?
  return (
    <div className={styles.masonic}>
      <GridList cellHeight={200} className={styles.gridList} cols={MAX_COLUMNS}>
        {instagramMediaList == null && isLoading && CircularLoader(MAX_COLUMNS)}
        {instagramMediaList && instagramMediaList.map((tile) => Card(tile))}
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
      </GridList>
    </div>
  );
}
