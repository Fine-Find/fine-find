export type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

export interface InstagramMediaChild {
  id?: string;
  media_type?: InstagramMediaType;
  permalink?: string;
  /**
   * Only available on VIDEO media
   */
  thumbnail_url?: string;
  timestamp?: string;
}

export interface InstagramMedia {
  caption?: string;
  id?: string;
  media_type?: InstagramMediaType;
  permalink?: string;
  /**
   * Only available on VIDEO media
   */
  thumbnail_url?: string;
  timestamp?: string;
  username?: string;
  media_url?: string;
  children?: {
    data: InstagramMediaChild[];
  };
}

export interface InstagramMediaCursors {
  before: string;
  after: string;
}

export interface InstagramMediaPaging {
  cursors: InstagramMediaCursors;
  next?: string;
}

export interface InstagramMediaResponse {
  data?: InstagramMedia[];
  paging?: InstagramMediaPaging;
}
