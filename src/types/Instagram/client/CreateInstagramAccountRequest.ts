/* eslint-disable @typescript-eslint/indent */
import { InstagramProfile } from '../InstagramProfile';
import { InstagramToken } from '../InstagramToken';

export interface CreateInstagramAccountRequest
  extends InstagramToken,
    InstagramProfile {}
