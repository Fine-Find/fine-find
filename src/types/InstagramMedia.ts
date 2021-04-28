export type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

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
  media_url?: string
}
