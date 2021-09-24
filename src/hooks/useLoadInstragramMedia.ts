import { mockInstagram } from '@/utils/mockedInstagramData';
import { useState } from 'react';
import {
  InstagramMedia,
  InstagramMediaPaging,
  InstagramMediaResponse,
} from 'types/Instagram/InstagramMedia';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fineFindApis } from '../utils/urls';

// TODO: Split this into smaller files as this one is getting big.

const RESPONSE_TIME_IN_MS = 1000;

interface NextInstagramPage {
  exists: boolean;
  uri?: string;
}

interface Response {
  nextPage: NextInstagramPage;
  data: InstagramMedia[];
}

export function useLoadInstagramMedia() {
  const [isLoading, setIsLoading] = useState(false);
  const [instagramMediaList, setInstagramMediaList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [nextPageUri, setNextPageUri] = useState(null);
  const [error, setError] = useState<Error>();

  async function loadMore() {
    setIsLoading(true);
    try {
      const { data, nextPage: newNextPage } = await loadInstagramItems(
        nextPageUri
      );
      setInstagramMediaList((current) => [...current, ...data]);
      setHasNextPage(newNextPage.exists);
      setNextPageUri(newNextPage.uri);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, instagramMediaList, hasNextPage, error, loadMore };
}

// TODO: Add Error
// TODO: Re-enable instagram
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function loadInstagramItems(nextPageUri?: string): Promise<Response> {
  // const instagramMediaUri = nextPageUri ?? fineFindApis.instagramMedia;

  return new Promise((resolve) => {
    setTimeout(async () => {
      // const mediaResponse = await fetch(instagramMediaUri);
      // const fetchedData: InstagramMediaResponse = await mediaResponse.json();
      const fetchedData = mockInstagram;
      // TODO: What happens when someone has multiple pictures in a single instagram post? Is that filtered out? What happens when there is an error?
      const filteredData: InstagramMedia[] = filterInstagramMedia(
        fetchedData.data
      );

      const nextInstagramPage: NextInstagramPage =
        determineNextPage(fetchedData);

      resolve({
        nextPage: nextInstagramPage,
        data: filteredData,
      });
    }, RESPONSE_TIME_IN_MS);
  });
}

function filterInstagramMedia(
  mediaToFilter: InstagramMedia[]
): InstagramMedia[] {
  if (mediaToFilter === undefined) {
    return [];
  }
  return mediaToFilter
    .filter((instagramMedia) => {
      return (
        instagramMedia.media_type === 'IMAGE' ||
        (instagramMedia.media_type === 'CAROUSEL_ALBUM' &&
          instagramMedia.children)
      );
    })
    .flatMap((instagramMedia) => {
      if (instagramMedia.media_type === 'IMAGE') {
        return instagramMedia;
      }

      const mappedAlbum: InstagramMedia[] = mapInstagramAlbum(instagramMedia);
      return mappedAlbum;
    });
}

function mapInstagramAlbum(album: InstagramMedia): InstagramMedia[] {
  return album.children.data
    .filter((instagramMediaChild) => {
      return instagramMediaChild.media_type === 'IMAGE';
    })
    .map((instagramMediaChild) => {
      const instagramMedia: InstagramMedia = { ...instagramMediaChild };
      return instagramMedia;
    });
}

function determineNextPage(
  instagramMediaResponse: InstagramMediaResponse
): NextInstagramPage {
  const nextPageExists = pageExists(instagramMediaResponse);

  const nextPageUri = nextPageExists
    ? getNextInstagramPageUri(instagramMediaResponse.paging)
    : null;

  return {
    exists: nextPageExists,
    uri: nextPageUri,
  };
}

function pageExists(instagramMediaResponse: InstagramMediaResponse): boolean {
  return instagramMediaResponse.paging && instagramMediaResponse.paging.next
    ? true
    : false;
}

function getNextInstagramPageUri(instagramMediaPaging: InstagramMediaPaging) {
  return instagramMediaPaging.next;
}
